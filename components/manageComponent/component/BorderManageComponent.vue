<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
            <div class="content-item">
                <h4 class="content-item__header">Zarządzanie obramowaniem</h4>
                <ul class="content-item__elem_container">
                <!-- <li class="content-item__elem" v-for="el in textAligns" :key="el">
                                <label :for="'textAlign-' + el">
                                    {{ el }}
                                    <input type="radio" v-model="textAlign" :value="el" name="textAlign" :id="'textAlign-' + el">

                                </label>
                            </li> -->
                </ul>
            </div>
            <div class="content-item">
                <h4 class="content-item__header">Pogrubienie tekstu</h4>
                <ul class="content-item__elem_container">
                <li class="content-item__elem" v-for="el in fontWeights" :key="el">
                    <label :for="'fontWeight-' + el">
                    {{ el }}
                    <input
                        type="radio"
                        v-model="fontWeight"
                        :value="el"
                        name="fontWeight"
                        :id="'fontWeight-' + el"
                    />
                    </label>
                </li>
                </ul>
            </div>
            
        </div>
   </div>
</template>

<script lang="ts">
    import {Component, Watch, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import { Chrome }  from '~/node_modules/vue-color';
import { Named } from '~/src/Unit';
import { BorderGlobalStyle, FontWeight } from '~/src/Css';
import BorderManage from '../BorderManage';

    @Component({
        components: {
            Chrome
        }
    })
    export default class BorderManageComponent extends BorderManage {

        @Prop({default: null, required: true})
        activeTag

        @Prop({default: false, required: false})
        autoUpdate

        @Watch('activeTag')
        updateTag() {

            this.onInitTag()
        }

        onInitTag(){
            if (this.activeTag) {
                this.setAutoSave(this.autoUpdate)
                this.init(this.activeTag)
            }
        }

        async mounted() {
            this.onInitTag()
        }

        timeout;
  // value: HtmlTag

  borderStyles: string[] = BorderGlobalStyle.getAccessableProperty();
  fontWeights: string[] = FontWeight.getAccessableProperty();

  idName = "text-property-modal";

  get hashID(): string {
    return this.idName;
  }


  // get textAlign()
  // {
  //     return this.getPropertyFromModel(TextAlign.PROP_NAME)
  // }

  // set textAlign(newVal: string)
  // {
  //     this.setPropertyToModel(new TextAlign(newVal, new Named()))
  // }

  get fontWeight() {
    return this.getPropertyFromModel(FontWeight.PROP_NAME);
  }

  set fontWeight(newVal: string) {
    console.log(newVal);
    this.setPropertyToModel(new FontWeight(newVal, new Named()));
  }

  @Watch("pagination.page", { deep: false, immediate: false })
  async onPaginationChange(e) {}

    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
</style>