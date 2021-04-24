<template >
  <base-modal
    v-show="active"
    @changePseudoSelector="onChangePseudoSelector"
    :tag="value"
  >
    <template slot="header">
      <div class="close">
        <button @click="close($event)">X</button>
      </div>

      <h4>Pozycjonowanie elementu</h4>
    </template>
    <template slot="content">
      
    </template>
    <template slot="footer">
      <button class="to-left" @click="restore($event)">Przywróć</button>
      <button class="to-right">Zapisz</button>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import moment from "moment";
import _ from "lodash";
import { Pagination } from "~/types/Pagination";
import HtmlTag from "../../src/Layout/HtmlTag";
import TextAlign from "../../src/Css/Text/TextAlign";
import BaseModal from "~/components/BaseModal.vue";
import FontWeight from "../../src/Css/Text/FontWeight";
import BasePropertyCss from "../../src/Css/BasePropertyCss";
import CssPropertyAccessor from "../../src/Css/CssPropertyAccessor";
import AbstractModal from "../AbstractModal";
import Named from "../../src/Unit/Named";
import UnitSize from "../../src/Unit/UnitSize";
import Pixel from "../../src/Unit/Size/Pixel";
import Percent from "../../src/Unit/Size/Percent";
import EM from "../../src/Unit/Size/EM";
import REM from "../../src/Unit/Size/REM";
import PaddingRightCss from "../../src/Css/BoxModel/Padding/PaddingRightCss";
import PaddingCss from "~/src/Css/BoxModel/Padding/PaddingCss";
import PaddingLeftCss from "../../src/Css/BoxModel/Padding/PaddingLeftCss";
import BasePaddingCss from "../../src/Css/BoxModel/BasePaddingCss";
import FetcherRealCssProp from "../../src/FetcherRealCssProp";
import PaddingRealCssFetcher from "../../src/Css/RealCssProp/PadingRealCssFetcher";
import VW from "../../src/Unit/Size/VW";
import VH from "~/src/Unit/Size/VH";
import BoxModelModal from "../BoxModelModal";
import PaddingBottomCss from "~/src/Css/BoxModel/Padding/PaddingBottomCss";
import PaddingTopCss from "~/src/Css/BoxModel/Padding/PaddingTopCss";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import MarginCss from "~/src/Css/BoxModel/Margin/MarginCss";
import MarginLeftCss from "~/src/Css/BoxModel/Margin/MarginLeftCss";
import MarginBottomCss from "~/src/Css/BoxModel/Margin/MarginBottomCss";
import MarginRightCss from "~/src/Css/BoxModel/Margin/MarginRightCss";
import MarginTopCss from "~/src/Css/BoxModel/Margin/MarginTopCss";
import CssAuto from "~/src/Css/CssAuto";
import BaseBorderCss from "../../src/Css/Border/BaseBorderCss";
import {
  Width,
  Display,
  JustifyContent,
  AlignItems,
  FlexDirection,
  FlexWrap,
  Float,
  Clear,
  PositionCss,
  BorderCollapse,
} from "~/src/Css";
import DisplayManageModal from "../DisplayManageModal";
import BorderSpacingProperty from "../computedPropertyManagers/impl/ComputedProperty/Table/BorderSpacingProperty";

@Component
export default class DisplayManageModalComponent extends AbstractModal {
  $refs: {
      manageComponent: TextManageComponent

  }

  mounted() {
      // this.$refs.manageComponent = null
  }
  onChangePseudoSelector()
  {
      this.$refs.manageComponent.onChangePseudoSelector()
  }

  show(currentActiveTag: HtmlTag){
      super.show(currentActiveTag)
      this.$refs.manageComponent.init(currentActiveTag)
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba($color: #d81121, $alpha: 0.4);
}
.green-bg {
  background-color: greenyellow;
}
.rel {
  position: relative;
}

.h-550 {
  height: 550px;
}
.w-400 {
  width: 400px;
}

.w-50-pr {
  width: 50%;
}

.h-400 {
  height: 400px;
}
</style>
