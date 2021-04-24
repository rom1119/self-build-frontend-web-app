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
      <h4>Tło elementu</h4>
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
import { Pagination } from "~/types/Pagination";
import HtmlTag from "../../src/Layout/HtmlTag";
import TextAlign from "../../src/Css/Text/TextAlign";
import BaseModal from "~/components/BaseModal.vue";
import FontWeight from "../../src/Css/Text/FontWeight";
import BasePropertyCss from "../../src/Css/BasePropertyCss";
import CssPropertyAccessor from "../../src/Css/CssPropertyAccessor";
import AbstractModal from "../AbstractModal";
import { Chrome } from "~/node_modules/vue-color";
import BackgroundColor from "~/src/Css/Background/BackgroundColor";
import RGBA from "../../src/Unit/Color/RGBA";
import Named from "~/src/Unit/Named";
import BackgroundImage from "../../src/Css/Background/BackgroundImage";
import UnitUrl from "../../src/Unit/UnitUrl";
import base64 from "base-64";
import BackgroundSize from "../../src/Css/Background/BackgroundSize";
import BackgroundPosition from "../../src/Css/Background/BackgroundPosition";
import BackgroundModal from "../BackgroundModal";
import UnitColor from "../../src/Unit/UnitColor";
import FileInput from "../forms/FileInput.vue";
import { BackgroundRepeat, BackgroundAttachment } from "~/src/Css";
import BackgroundImageProperty from "../computedPropertyManagers/impl/ComputedProperty/Background/BackgroundImageProperty";

// let Chrome = ColourPicker.Chrome



@Component({
  components: {
    Chrome,
  },
})
export default class BackgroundManageModal extends AbstractModal {
  
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
</style>
