/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *******************************************************************************/
package org.ofbiz.widget.screen;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javolution.util.FastMap;

import org.ofbiz.base.util.Debug;
import org.ofbiz.base.util.GeneralException;
import org.ofbiz.base.util.StringUtil;
import org.ofbiz.base.util.UtilGenerics;
import org.ofbiz.base.util.UtilValidate;
import org.ofbiz.base.util.UtilXml;
import org.ofbiz.base.util.cache.UtilCache;
import org.ofbiz.base.util.collections.MapStack;
import org.ofbiz.base.util.string.FlexibleStringExpander;
import org.ofbiz.base.util.template.FreeMarkerWorker;
import org.ofbiz.widget.ModelWidget;
import org.ofbiz.widget.html.HtmlWidgetRenderer;
import org.w3c.dom.Element;

import freemarker.ext.beans.BeansWrapper;
import freemarker.ext.beans.CollectionModel;
import freemarker.ext.beans.StringModel;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import freemarker.template.Version;

/**
 * Widget Library - Screen model HTML class.
 */
@SuppressWarnings("serial")
public class HtmlWidget extends ModelScreenWidget {
    public static final String module = HtmlWidget.class.getName();

    private static final UtilCache<String, Template> specialTemplateCache = UtilCache.createUtilCache("widget.screen.template.ftl.general", 0, 0, false);
    protected static Configuration specialConfig = FreeMarkerWorker.makeConfiguration(new ExtendedWrapper(FreeMarkerWorker.version));

    // not sure if this is the best way to get FTL to use my fancy MapModel derivative, but should work at least...
    public static class ExtendedWrapper extends BeansWrapper {
        public ExtendedWrapper(Version version) {
            super(version);
        }

        @SuppressWarnings("unchecked")
        @Override
        public TemplateModel wrap(Object object) throws TemplateModelException {
            // This StringHtmlWrapperForFtl option seems to be the best option
            // and handles most things without causing too many problems
            if (object instanceof String) {
                return new StringHtmlWrapperForFtl((String) object, this);
            } else if (object instanceof Collection && !(object instanceof Map)) {
                // An additional wrapper to ensure ${aCollection} is properly encoded for html
                return new CollectionHtmlWrapperForFtl((Collection) object, this);
            }
            return super.wrap(object);
        }
    }

    public static class StringHtmlWrapperForFtl extends StringModel {
        public StringHtmlWrapperForFtl(String str, BeansWrapper wrapper) {
            super(str, wrapper);
        }
        @Override
        public String getAsString() {
            return StringUtil.htmlEncoder.encode(super.getAsString());
        }
    }

    public static class CollectionHtmlWrapperForFtl extends CollectionModel {

        @SuppressWarnings("unchecked")
        public CollectionHtmlWrapperForFtl(Collection collection, BeansWrapper wrapper) {
            super(collection, wrapper);
        }

        @Override
        public String getAsString() {
            return StringUtil.htmlEncoder.encode(super.getAsString());
        }

    }

    // End Static, begin class section

    protected List<ModelScreenWidget> subWidgets = new ArrayList<ModelScreenWidget>();

    public HtmlWidget(ModelScreen modelScreen, Element htmlElement) {
        super(modelScreen, htmlElement);
        List<? extends Element> childElementList = UtilXml.childElementList(htmlElement);
        for (Element childElement : childElementList) {
            if ("html-template".equals(childElement.getNodeName())) {
                this.subWidgets.add(new HtmlTemplate(modelScreen, childElement));
            } else if ("html-template-decorator".equals(childElement.getNodeName())) {
                this.subWidgets.add(new HtmlTemplateDecorator(modelScreen, childElement));
            } else {
                throw new IllegalArgumentException("Tag not supported under the platform-specific -> html tag with name: " + childElement.getNodeName());
            }
        }
    }

    @Override
    public void renderWidgetString(Appendable writer, Map<String, Object> context, ScreenStringRenderer screenStringRenderer) throws GeneralException, IOException {
        for (ModelScreenWidget subWidget : subWidgets) {
            subWidget.renderWidgetString(writer, context, screenStringRenderer);
        }
    }

    @Override
    public String rawString() {
        StringBuilder buffer = new StringBuilder("<html-widget>");
        for (ModelScreenWidget subWidget : subWidgets) {
            buffer.append(subWidget.rawString());
        }
        buffer.append("</html-widget>");
        return buffer.toString();
    }

    public static void renderHtmlTemplate(Appendable writer, FlexibleStringExpander locationExdr, Map<String, Object> context) {
        String location = locationExdr.expandString(context);
        //Debug.logInfo("Rendering template at location [" + location + "] with context: \n" + context, module);

        if (UtilValidate.isEmpty(location)) {
            throw new IllegalArgumentException("Template location is empty");
        }

        if (location.endsWith(".ftl")) {
            try {
                Map<String, ? extends Object> parameters = UtilGenerics.checkMap(context.get("parameters"));
                boolean insertWidgetBoundaryComments = ModelWidget.widgetBoundaryCommentsEnabled(parameters);
                if (insertWidgetBoundaryComments) {
                    writer.append(HtmlWidgetRenderer.formatBoundaryComment("Begin", "Template", location));
                }

                //FreeMarkerWorker.renderTemplateAtLocation(location, context, writer);
                Template template = null;
                if (location.endsWith(".fo.ftl")) { // FOP can't render correctly escaped characters
                    template = FreeMarkerWorker.getTemplate(location);
                } else {
                    template = FreeMarkerWorker.getTemplate(location, specialTemplateCache, specialConfig);
                }
                FreeMarkerWorker.renderTemplate(template, context, writer);

                if (insertWidgetBoundaryComments) {
                    writer.append(HtmlWidgetRenderer.formatBoundaryComment("End", "Template", location));
                }
            } catch (IllegalArgumentException e) {
                String errMsg = "Error rendering included template at location [" + location + "]: " + e.toString();
                Debug.logError(e, errMsg, module);
                writeError(writer, errMsg);
            } catch (MalformedURLException e) {
                String errMsg = "Error rendering included template at location [" + location + "]: " + e.toString();
                Debug.logError(e, errMsg, module);
                writeError(writer, errMsg);
            } catch (TemplateException e) {
                String errMsg = "Error rendering included template at location [" + location + "]: " + e.toString();
                Debug.logError(e, errMsg, module);
                writeError(writer, errMsg);
            } catch (IOException e) {
                String errMsg = "Error rendering included template at location [" + location + "]: " + e.toString();
                Debug.logError(e, errMsg, module);
                writeError(writer, errMsg);
            }
        } else {
            throw new IllegalArgumentException("Rendering not yet supported for the template at location: " + location);
        }
    }

    // TODO: We can make this more fancy, but for now this is very functional
    public static void writeError(Appendable writer, String message) {
        try {
            writer.append(message);
        } catch (IOException e) {
        }
    }

    public static class HtmlTemplate extends ModelScreenWidget {
        protected FlexibleStringExpander locationExdr;

        public HtmlTemplate(ModelScreen modelScreen, Element htmlTemplateElement) {
            super(modelScreen, htmlTemplateElement);
            this.locationExdr = FlexibleStringExpander.getInstance(htmlTemplateElement.getAttribute("location"));
        }

        @Override
        public void renderWidgetString(Appendable writer, Map<String, Object> context, ScreenStringRenderer screenStringRenderer) {
            renderHtmlTemplate(writer, this.locationExdr, context);
        }

        @Override
        public String rawString() {
            return "<html-template location=\"" + this.locationExdr.getOriginal() + "\"/>";
        }
    }

    public static class HtmlTemplateDecorator extends ModelScreenWidget {
        protected FlexibleStringExpander locationExdr;
        protected Map<String, HtmlTemplateDecoratorSection> sectionMap = FastMap.newInstance();

        public HtmlTemplateDecorator(ModelScreen modelScreen, Element htmlTemplateDecoratorElement) {
            super(modelScreen, htmlTemplateDecoratorElement);
            this.locationExdr = FlexibleStringExpander.getInstance(htmlTemplateDecoratorElement.getAttribute("location"));

            List<? extends Element> htmlTemplateDecoratorSectionElementList = UtilXml.childElementList(htmlTemplateDecoratorElement, "html-template-decorator-section");
            for (Element htmlTemplateDecoratorSectionElement: htmlTemplateDecoratorSectionElementList) {
                String name = htmlTemplateDecoratorSectionElement.getAttribute("name");
                this.sectionMap.put(name, new HtmlTemplateDecoratorSection(modelScreen, htmlTemplateDecoratorSectionElement));
            }
        }

        @Override
        public void renderWidgetString(Appendable writer, Map<String, Object> context, ScreenStringRenderer screenStringRenderer) {
            // isolate the scope
            MapStack<String> contextMs;
            if (!(context instanceof MapStack<?>)) {
                contextMs = MapStack.create(context);
                context = contextMs;
            } else {
                contextMs = UtilGenerics.cast(context);
            }

            // create a standAloneStack, basically a "save point" for this SectionsRenderer, and make a new "screens" object just for it so it is isolated and doesn't follow the stack down
            MapStack<String> standAloneStack = contextMs.standAloneChildStack();
            standAloneStack.put("screens", new ScreenRenderer(writer, standAloneStack, screenStringRenderer));
            SectionsRenderer sections = new SectionsRenderer(this.sectionMap, standAloneStack, writer, screenStringRenderer);

            // put the sectionMap in the context, make sure it is in the sub-scope, ie after calling push on the MapStack
            contextMs.push();
            context.put("sections", sections);

            renderHtmlTemplate(writer, this.locationExdr, context);
            contextMs.pop();
        }

        @Override
        public String rawString() {
            return "<html-template-decorator location=\"" + this.locationExdr.getOriginal() + "\"/>";
        }
    }

    public static class HtmlTemplateDecoratorSection extends ModelScreenWidget {
        protected String name;
        protected List<ModelScreenWidget> subWidgets;

        public HtmlTemplateDecoratorSection(ModelScreen modelScreen, Element htmlTemplateDecoratorSectionElement) {
            super(modelScreen, htmlTemplateDecoratorSectionElement);
            this.name = htmlTemplateDecoratorSectionElement.getAttribute("name");
            // read sub-widgets
            List<? extends Element> subElementList = UtilXml.childElementList(htmlTemplateDecoratorSectionElement);
            this.subWidgets = ModelScreenWidget.readSubWidgets(this.modelScreen, subElementList);
        }

        @Override
        public void renderWidgetString(Appendable writer, Map<String, Object> context, ScreenStringRenderer screenStringRenderer) throws GeneralException, IOException {
            // render sub-widgets
            renderSubWidgetsString(this.subWidgets, writer, context, screenStringRenderer);
        }

        @Override
        public String rawString() {
            return "<html-template-decorator-section name=\"" + this.name + "\"/>";
        }
    }
}
