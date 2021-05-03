<template>
  <div v-context-menu="'layout-builder-cm'">
    <div class="media-query-controls">
      <media-query-component
        ref="mediaQueryComponent"
        @selectMediaQuery="onSelectMediaQuery"
        @changeThisMedia="onSelectMediaQuery"
      />
    </div>
    <html-element-context-menu
      @click.stop=""
      @opened="cmIsOpened"
      ref="layout-builder-cm"
    />

      <div>
        <template v-if="appEventsController">
          <animation-tool-sidebar  :keyFrameAccessor="keyFrameAccessor">
          </animation-tool-sidebar>
          
          <layout-tag-tool-sidebar  :accualActiveEl="appEventsController.activeToManageController.accualActiveEl">
          </layout-tag-tool-sidebar>
        
            
          
        </template>
      </div>

    <object id="layout-object" class="main-object" :style="windowStyles">
      <html>
        <head>
          <template v-if="$layoutCreatorMode">
            <style
              v-if="$layoutCreatorMode.mode.canRun(pseudoSelectorAction)"
              v-html="pseudoSelectorsTags"
            ></style>

            <style
              v-if="$layoutCreatorMode.mode.canRun(mediaQueryAction)"
              v-html="mediaQueryElements"
            ></style>

            <style
              v-if="$layoutCreatorMode.mode.canRun(fontFaceAction)"
              v-html="fontFaceElements"
            ></style>

            <style
              v-if="$layoutCreatorMode.mode.canRun(keyFrameAction)"
              v-html="keyFrameElements"
            ></style>
          </template>
        </head>
        <!-- <create-html-element-context-menu :value="htmlTags"  :ref="contextMenuName" /> -->

        <body
          @mouseup="onMouseUp($event)"
          @mousemove="onMouseMove($event)"
          style="min-height: 100vh; overflow-x: visible"
        >
          <!-- <ul>
                            {{ pseudoSelectorsTags }}
                        </ul> -->

          <template v-for="htmlTag in htmlTags">
            <component
              :is="getComponentNameByTag(htmlTag)"
              @tagRemove="onTagRemove"
              @anyElementMouseOver="onMouseOver"
              @anyElementMouseOut="onMouseOut"
              @anyElementMouseDown="onMouseDown"
              @contentMouseClick="onContentMouseClick"
              @anyElementMouseClick="onAnyElementMouseClick"
              :value="htmlTag"
              :key="htmlTag.uuid"
            >
            </component>
          </template>
        </body>
      </html>
    </object>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import HtmlTag from "../../src/Layout/HtmlTag";
import HtmlTagFactory from "../../src/Layout/HtmlTagFactory";
import DefaultApiService from "~/src/Api/impl/DefaultApiService";
import HtmlNode from "../../src/Layout/HtmlNode";
import PseudoSelectorViewAction from "../../src/Mode/action/PseudoSelectorViewAction";
import ViewMode from "~/src/Mode/impl/ViewMode";
import TextNode from "~/src/Layout/TextNode";
import RemoverAdvisor from "~/src/Remover/RemoverAdvisor";
import DefaultRemoverAdvisor from "~/src/Remover/advisor/DefaultRemoverAdvisor";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryComponent from "~/components/MediaQueryComponent.vue";
import MediaQueryForCssList from "~/src/MediaQuery/headSection/MediaQueryForCssList";
import FontFaceViewAction from "~/src/Mode/action/FontFaceViewAction";
import FontFaceAccessor from "~/src/Fonts/FontFaceAccessor";
import MediaQueryViewModeAction from "../../src/Mode/action/MediaQueryViewModeAction";
import KeyFrameViewModeAction from "../../src/Mode/action/KeyFrameViewModeAction";
import AppEventsController from '../../src/Controller/AppEventsController';
import LayoutTagToolSidebar from "~/components/LayoutTagToolSidebar.vue";
import KeyFrameAccessor from "~/src/Animation/KeyFrameAccessor";
import DefaultActiveToAnimationController from "~/src/Controller/DefaultActiveToAnimationController";
import AnimationCreator from "~/src/Animation/AnimationCreator";
import LayoutCreatorInfoComponent from '../LayoutCreatorInfoComponent.vue';

@Component({
  components: {
    LayoutTagToolSidebar
  }
})
export default class LayoutCreatorContainer extends Vue {
  contextMenuName = "cm-create-html-element";
  htmlTags: HtmlTag[] = [];
  htmlFactory: HtmlTagFactory = new HtmlTagFactory();

  public mediaQueryComponent: MediaQueryComponent;

  $refs: {
    mediaQueryComponent: MediaQueryComponent;
  };

  a = `<template v-for="selectors in pseudoSelectorsTags">

            <template v-for="(key, cssList) in selectors">
                {{ key }} {
                    <template v-for="css in cssList">
                            {{ css.getName() }}: {{ css.getValue() }};                                     -->
                    </template>
                }
            </template>
        </template> `;


  tagRemoverAdvisor: RemoverAdvisor;

  windowWidth = "100%";

  appEventsController: AppEventsController = null


  pseudoSelectorAction = new PseudoSelectorViewAction();
  mediaQueryAction = new MediaQueryViewModeAction();
  fontFaceAction = new FontFaceViewAction();
  keyFrameAction = new KeyFrameViewModeAction();

  mediaQueryList: MediaQueryForCssList;

  @Prop({ required: true })
  fontFaceAccesor: FontFaceAccessor = null;
  
  @Prop({ required: true })
  keyFrameAccessor: KeyFrameAccessor;

  updateTagsOnChangeMediaQuery(list) {
    for (const el of list) {
      if (el instanceof HtmlTag) {
        // el.clearSelectedSelectors()
        el.onChangeMediaQuery();

        this.updateTagsOnChangeMediaQuery(el.children);
      }
    }
  }

  created() {}
  mounted() {
    this.mediaQueryComponent = this.$refs["mediaQueryComponent"];
    this.mediaQueryList = new MediaQueryForCssList();
    var api = new DefaultApiService();
    this.tagRemoverAdvisor = new DefaultRemoverAdvisor(this.htmlTags, api);
    document.body.addEventListener("mousemove", (e) => {
      // @ts-ignore
      if (parseInt(e.clientX) % 10 == 0) {
        // console.log(e.clientX);
      }
    });
    window.addEventListener("resize", (e) => {
      // console.log('width', (<Window>e.target).innerWidth);
      // console.log('height', e.target.innerHeight);
      for (const htmlTag of this.htmlTags) {
        htmlTag.recalculateRealComputedProperties();
      }
    });

    window.document.body.addEventListener("keydown", this.onKeyDown);
    window.document.body.addEventListener("keyup", this.onKeyUp);
    // console.log('LayoutCreatorContainer');
    // console.log(this);   
    this.$layoutCreatorMode.$on("change", (e) => {
      if (e instanceof ViewMode) {
        this.recursiveClearSelectedSelector(this.htmlTags);
      }
    });

    var animationCreator = AnimationCreator.getInstance()
    var activeAnimationController = new DefaultActiveToAnimationController(this.htmlTags, animationCreator)
    animationCreator.setActiveController(activeAnimationController)
    this.$layoutCreatorInfo.setActiveToAnimation(activeAnimationController)
    this.appEventsController = new AppEventsController(this.$layoutCreatorMode, activeAnimationController)
  }

  get windowStyles() {
    return {
      width: this.windowWidth,
      overflow: "hidden",
      borderRight: "2px solid black",
    };
  }

  public onSelectMediaQuery(media: BaseMediaQueryCss) {
    console.log("onSelectMediaQuery");
    // console.log(media)
    // console.log(media.values[0])
    this.updateTagsOnChangeMediaQuery(this.htmlTags);

    if (media) {
      if (media.values.length > 0) {
        var val = media.values[0];
        if (val.getFeatureValue()) {
          this.windowWidth = val.getFeatureValue();
          return;
        }
      }
    }

    this.windowWidth = "100%";
  }

  public addHtmlTag(tag: HtmlTag) {
    this.htmlTags.push(tag);
  }

  cmIsOpened(cm) {
    // @ts-ignore
    this.$refs["layout-builder-cm"].initOpen(
      this.appEventsController.getCurrentMouseOverTag(),
      this.htmlTags
    );
  }

  private recursiveClearSelectedSelector(list) {
    for (const el of list) {
      if (el instanceof HtmlTag) {
        el.clearSelectedSelectors();
        el.onChangeSelector();

        this.recursiveClearSelectedSelector(el.children);
      }
    }
  }

  private recursiveBuildPseudoSelectors(list, tag: HtmlTag) {
    for (const el of tag.children) {
      if (el instanceof HtmlTag) {
        list.push(el.pseudoSelectorsList);
        this.recursiveBuildPseudoSelectors(list, el);
      }
    }

    return list;
  }

  private recursiveBuildMediaQueries(list, tag: HtmlTag) {
    for (const el of tag.children) {
      if (el instanceof HtmlTag) {
        list.push(el.mediaQueryWithElements);
        this.recursiveBuildMediaQueries(list, el);
      }
    }

    return list;
  }

  get pseudoSelectorsTags(): string {
    let list = [];
    for (const tag of this.htmlTags) {
      console.log(tag.pseudoSelectorsList);
      list.push(tag.pseudoSelectorsList);
      this.recursiveBuildPseudoSelectors(list, tag);
    }

    var res = "";
    for (const selectors of list) {
      for (const key in selectors) {
        var cssList = selectors[key];
        res += key + " {";
        for (const css of cssList) {
          res += css.getName() + ":" + css.getValue() + " !important ;";
        }
        res += "}";
      }
    }

    return res;
  }

  // @Watch('fontFaceAccesor', {deep: true})
  // asd(a) {
  //     console.error('watch FontFaceAccessor')
  //     console.log(a)

  // }

  get keyFrameElements(): string {
    var res = "";

    return res;
  }

  get fontFaceElements(): string {
    var res = "";
    var reas = this.fontFaceAccesor;
    // console.log('onChangeFontFace')
    // console.log(FontFaceAccessor.getInstance())
    // console.log(this.fontFaceAccesor)

    if (!this.fontFaceAccesor) {
      return res;
    }

    for (const fontFace of this.fontFaceAccesor.all) {
      res += "@font-face {";
      res += `font-family: "${fontFace.name}";`;
      res += `src: `;

      for (var i = 0; i < fontFace.src.length; i++) {
        var srcItem = fontFace.src[i];
        var url;
        if (srcItem.resource) {
          url = srcItem.resource;
        } else {
          url = srcItem.resourceUrl;
        }
        res += `url("${url}")`;

        if (srcItem.format) {
          res += ` `;
          res += `format("${srcItem.format}")`;
        }

        if (i === fontFace.src.length - 1) {
          res += ` ;`;
        } else {
          res += ` ,`;
        }
      }

      res += "}";
    }
    // console.log('END onChangeFontFace')
    // console.log(res)

    return res;
  }

  get mediaQueryElements(): string {
    let list = [];
    this.mediaQueryList.reset();
    for (const tag of this.htmlTags) {
      // console.log(tag.mediaQueryWithElements);
      list.push(tag.mediaQueryWithElements);
      this.recursiveBuildMediaQueries(list, tag);
    }

    var res = "";

    // for (const mediaItemKey of this.mediaQueryList.items) {
    //     var mediaItem = this.mediaQueryList.items
    for (const el of list) {
      for (const mediaTag of el) {
        this.mediaQueryList.addMediaQueryTag(mediaTag);
      }
    }
    // }

    for (const mediaItemKey in this.mediaQueryList.items) {
      var mediaItem = this.mediaQueryList.items[mediaItemKey];
      res += mediaItem.mediaQuery.getValue() + " {";

      for (const mediaTag of mediaItem.tags) {
        var cssList = mediaTag.cssList;
        res += mediaTag.selector + " {";
        for (const css of cssList) {
          res += css.getName() + ":" + css.getValue() + " !important ;";
        }
        res += "}";
      }

      res += "}";
    }

    return res;
  }

  getComponentNameByTag(tag: HtmlNode) {
    // console.log(tag)
    // @ts-ignore
    if (tag.isTableTag) {
      // console.log('html-table-component')
      return "html-table-component";
      // @ts-ignore
    } else if (tag.isTableCellTag) {
      // console.log('html-table-cell-component')
      return "html-table-cell-component";

      // @ts-ignore
    } else if (!(tag instanceof TextNode)) {
      // console.log('html-component')
      return "html-component";
    } else {
      // console.log('html-text-node')
      return "html-text-node";
    }
  }

  onMouseOver(val) {
    this.appEventsController.onMouseOver(val)
  }

  onMouseOut(val) {
    // console.log('out');
    this.appEventsController.onMouseOut(val)
  }

  onAnyElementMouseClick(source) {
    this.appEventsController.onAnyElementMouseClick(source)
  }

  onContentMouseClick(source) {
    // if (!this.$layoutCreatorMode.mode.canRun(new MouseClickAction())) {
    //     return
    // }
  }

  onTagRemove(source) {
    // console.log('tagRemove');
    let tag: HtmlNode = source.target;
    this.tagRemoverAdvisor.advise(tag).remove(tag);
    // console.log(a);
  }

  onMouseDown(source) {
    this.appEventsController.onMouseDown(source)

  }

  onMouseUp(e) {
    this.appEventsController.onMouseUp(e)
  }

  onMouseMove(e) {
    this.appEventsController.onMouseMove(e)
  }

  onKeyDown(e) {
    this.appEventsController.onKeyDown(e)
  }

  onKeyUp(e) {
    this.appEventsController.onKeyUp(e)
  }
}
</script>
