<template >
  <div class=" content-item__elem_container">
    <div class=" content-item_half">
        <h6 class="content-item__header">
        </h6>
        <select class="content-item__elem" @change="onChangeFontType" v-model="fontFamVal.fontType" name="fontFamily" >
            <option v-for="el, kkk in fontFamVal.availableFontTypes" :key="kkk" :value="el" >
                {{ el }}
            </option>
        </select>
    </div>
    <div class=" content-item_half">
        <h6 class="content-item__header">
        
            <span  class="p-abs" style="top: 20px; left: -5px;">
                <span class="remove-btn" @click="removeFontFamilyVal(fontFamVal)"> X </span>
                <span class="p-abs" style="top: 20px; left: -45px;" v-if="fontFamVal.fontFace">
                </span>
            </span>
    
        </h6>
        <select v-if="fontFamVal.fontType == 'custom'" @change="onUpdateFontFaceInFontFamily" v-model="compFontFace"  class="content-item__elem"  name="fontFamily" >
            <option v-for="el, kkk in fontFamVal.availableFonts" :key="kkk" :value="el.fontFace" >
                {{ el.name }}
            </option>
        </select>
        <select v-else @change="onUpdateFontFamily"  class="content-item__elem"  v-model="fontFamVal.fontName" name="fontFamily" >
            <option v-for="el, kkk in fontFamVal.availableFonts" :key="kkk" :value="el.fontName" >
                {{ el.name }}
            </option>
        </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import moment from "moment";
import { Pagination } from "~/types/Pagination";
import { TextShadowStruct } from "~/src/Css/Shadow/TextShadowCss";
import { Chrome } from "~/node_modules/vue-color";
import { RGBA } from "~/src/Unit";
import HtmlTag from "~/src/Layout/HtmlTag";
import FontFamilyValDomain from "~/src/Fonts/FontFamilyValDomain";
import FontFamilyProperty from "~/components/computedPropertyManagers/impl/ComputedProperty/Text/FontFamilyProperty";
import FontFace from "~/src/Fonts/FontFace";
import FontFaceAccessor from "~/src/Fonts/FontFaceAccessor";

@Component({
  components: {
    Chrome,
  },
})
export default class FontFamilyValueComponent extends Vue {
  timeout;

  @Prop({ default: null, required: true })
  fontFamVal: FontFamilyValDomain;

  @Prop({ default: null, required: true })
  fontFamilyManager: FontFamilyProperty;

  compFontFace: FontFace = null;

  // @Prop({ default: null, required: true })
  // index: number;

  // @Prop({default:null, required:false})
  // classList: string[]

  cmNameTextShadowOffX =
    Math.floor(Math.random() * 1000000000).toString() + "text_shadow_off_x";
  cmNameTextShadowOffY =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-off-y";
  cmNameTextShadowBlur =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-blur";
  cmNameTextShadowColor =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-color";

  pickerActive = false;

  color: any = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  };


  mounted() {
    // console.log(this.contextMenuName);
    console.log('VVAAAAA');
    console.log('this.fontFamVal');
    console.log(this.fontFamVal);
    this.compFontFace = this.fontFamVal.fontFace
    
  }

  removeFontFamilyVal(val: FontFamilyValDomain) {
    console.log('removeFontFamilyVal');
    console.log(val);
      if (this.fontFamVal.fontFace) {
        FontFaceAccessor.getInstance().deleteFontOwnerFromFontFace(this.fontFamVal.fontFace, this.fontFamilyManager.getProperty(), val)

      }
      this.fontFamilyManager.removeFontFamilyVal(val)

      this.onUpdateFontFamily()
  }


  onChangeFontType()
  {
    console.log('onChangeFontType');
    this.compFontFace = this.fontFamVal.availableFonts[0].fontFace
    if (this.compFontFace) {
      this.fontFamVal.fontFace = this.compFontFace

    } else {
      this.fontFamVal.fontName = this.fontFamVal.availableFonts[0].getName()

    }
      console.log(this.fontFamVal);

      this.fontFamilyManager.updateCssProp(this.fontFamilyManager.getProperty())
    if (this.fontFamVal.fontFace) {
        FontFaceAccessor.getInstance().addFontOwnerToFontFace(this.fontFamVal.fontFace, this.fontFamilyManager.getProperty(), this.fontFamVal)
  
      }
  }

  onUpdateFontFamily()
  {
      console.log();
      if (!this.fontFamilyManager.getProperty()) {
          return
      }

      this.fontFamVal.fontFace = null
      // var f = FontFamily.findFontByName(newVal)
      // this.fontFamilyManager.getProperty().setValue(f)

      this.fontFamilyManager.updateCssProp(this.fontFamilyManager.getProperty())
  }


  onUpdateFontFaceInFontFamily(val)
  {
      // console.log('onUpdateFontFaceInFontFamily');
      // console.log(this.compFontFace);
      // console.log(this.fontFamVal.fontFace);
      // console.log(val.target);
      // console.log(val.target.value);
      if (this.fontFamVal.fontFace) {
        if (this.compFontFace.id !== this.fontFamVal.fontFace.id) {
          FontFaceAccessor.getInstance().deleteFontOwnerFromFontFace(this.fontFamVal.fontFace, this.fontFamilyManager.getProperty(), this.fontFamVal)
  
        }

      }

      this.fontFamVal.fontFace = this.compFontFace
      if (this.fontFamVal.fontFace) {
        FontFaceAccessor.getInstance().addFontOwnerToFontFace(this.fontFamVal.fontFace, this.fontFamilyManager.getProperty(), this.fontFamVal)

      }

      if (!this.fontFamilyManager.getProperty()) {
          return
      }
      // var f = FontFamily.findFontByName(newVal)
      // this.fontFamilyManager.getProperty().setValue(f)

      this.fontFamilyManager.updateCssProp(this.fontFamilyManager.getProperty())
  }

  change() {
    this.$emit("change");
  }

  // get allClass()
  // {
  //     var res = this.classList
  //     if (this.hasProperty) {
  //         if (this.globalEl) {
  //             res.push('active-global')

  //         } else {
  //             res.push('active')

  //         }
  //     }

  //     return res
  // }

  // get customHasProp()
  // {
  //     return this.hasProperty
  // }

  // set customHasProp(val)
  // {
  //     this.$emit('changeHasProp', val)
  // }

  // get customProp()
  // {
  //     return this.property
  // }

  // set customProp(val)
  // {
  //     this.$emit('changeProp', val)
  // }

  // get customPropUnit()
  // {
  //     return this.propertyUnit
  // }

  // set customPropUnit(val)
  // {
  //     if (val) {
  //         this.$emit('changePropUnit', val)

  //     }
  // }

  @Watch("pagination.page", { deep: false, immediate: false })
  async onPaginationChange(e) {}
}
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.6;
}
.auto-prop {
  background-color: red;
  padding: 5px;
  // margin-left: 3px;
  border-radius: 5px;
}
.green-bg {
  background-color: greenyellow;
}
// .rel {
//     position: relative;
// }

// .h-550 {
//     height: 550px;
// }
// .w-400 {
//     width: 400px;
// }

// .h-400 {
//     height: 400px;
// }
</style>
