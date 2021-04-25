<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
        
            <div class="content-item__elem_container">
              <div
                class="content-item-half"
                @dblclick="hasBackgroundColor = !hasBackgroundColor"
                :class="{ active: hasBackgroundColor }"
              >
                <h4 class="content-item__header">Kolor tła</h4>
                <div class="content-item__elem_container">
                  <h2>
                    {{ backgroundColor }}
                  </h2>
                  <Chrome
                    v-model="backgroundColor"
                    :color="backgroundColor"
                    label="Color"
                  />
                </div>
              </div>
              <div
                class="content-item-half"
                @dblclick="hasBackgroundImage = !hasBackgroundImage"
                :class="{ active: hasBackgroundImage }"
              >
                <h4 class="content-item__header">Zdjęcie tła</h4>
                <div class="content-item">
                  <input
                    type="file"
                    id="imgFile"
                    @change="previewThumbnail($event)"
                    accept="image/*"
                    class="input-file"
                  />
                  <div>
                    <button
                      v-if="backgroundImageManager.getProperty().resource"
                      @click.stop="deleteResource"
                      type="button"
                    >
                      Usuń zasób
                    </button>
                    <img
                      v-if="backgroundImage"
                      :src="backgroundImage"
                      alt=""
                      width="200"
                      height="200"
                    />
                    <img
                      v-else
                      :src="backgroundImageManager.getProperty().resourceUrl"
                      alt=""
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div
                  class="content-item"
                  v-if="!backgroundImageManager.getProperty().resource"
                >
                  <label for="">
                    Link do zewnętrznego zasobu

                    <input
                      type="text"
                      style="width: 100%"
                      @change="updateBackgroundImage"
                      v-model="backgroundImageManager.getProperty().resourceUrl"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div
              class="content-item"
              @dblclick="hasBackgroundPosition = !hasBackgroundPosition"
              :class="{ active: hasBackgroundPosition }"
            >
              <h4 class="content-item__header">Background position</h4>
              <ul class="content-item__elem_container">
                <li
                  class="content-item__elem"
                  v-for="el in backgroundPositions"
                  :key="el"
                >
                  <label :for="'backgroundPosition-' + el">
                    {{ el }}
                    <input
                      type="radio"
                      v-model="backgroundPosition"
                      :value="el"
                      name="backgroundPosition"
                      :id="'backgroundPosition-' + el"
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div
              class="content-item"
              @dblclick="hasBackgroundSize = !hasBackgroundSize"
              :class="{ active: hasBackgroundSize }"
            >
              <h4 class="content-item__header">Background size</h4>
              <ul class="content-item__elem_container">
                <li
                  class="content-item__elem"
                  v-for="el in backgroundSizes"
                  :key="el"
                >
                  <label :for="'backgroundSize-' + el">
                    {{ el }}
                    <input
                      type="radio"
                      v-model="backgroundSize"
                      :value="el"
                      name="backgroundSize"
                      :id="'backgroundSize-' + el"
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div
              class="content-item"
              @dblclick="hasBackgroundRepeat = !hasBackgroundRepeat"
              :class="{ active: hasBackgroundRepeat }"
            >
              <h4 class="content-item__header">Background Repeat</h4>
              <ul class="content-item__elem_container">
                <li
                  class="content-item__elem"
                  v-for="el in backgroundRepeats"
                  :key="el"
                >
                  <label :for="'backgroundSize-' + el">
                    {{ el }}
                    <input
                      type="radio"
                      v-model="backgroundRepeat"
                      :value="el"
                      name="backgroundRepeat"
                      :id="'backgroundRepeat-' + el"
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div
              class="content-item"
              @dblclick="hasBackgroundAttachment = !hasBackgroundAttachment"
              :class="{ active: hasBackgroundAttachment }"
            >
              <h4 class="content-item__header">Background Attachment</h4>
              <ul class="content-item__elem_container">
                <li
                  class="content-item__elem"
                  v-for="el in backgroundAttachments"
                  :key="el"
                >
                  <label :for="'backgroundSize-' + el">
                    {{ el }}
                    <input
                      type="radio"
                      v-model="backgroundAttachment"
                      :value="el"
                      name="backgroundAttachment"
                      :id="'backgroundAttachment-' + el"
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
import BackgroundManage from '../BackgroundManage';
import BackgroundImageProperty from '~/components/computedPropertyManagers/impl/ComputedProperty/Background/BackgroundImageProperty';
import { BackgroundSize, BackgroundPosition, BackgroundRepeat, BackgroundAttachment, BackgroundColor } from '~/src/Css';
import { UnitUrl, RGBA } from '~/src/Unit';
import UnitColor from '~/src/Unit/UnitColor';

interface colorObject {
  r;
  g;
  b;
  a;
}

interface Color {
  rgba: colorObject;
}
    @Component({
        components: {
            Chrome
        }
    })
    export default class BackgroundManageComponent extends BackgroundManage {

        @Prop({default: null, required: true})
        activeTag

        @Watch('activeTag')
        updateTag() {
            console.log('TextManagComponent updated');
            console.log(this.activeTag);
            if (this.activeTag) {
                this.init(this.activeTag)
            } else {
            }
        }

  timeout;
  imgEl;
  // value: HtmlTag
  colour = "#fff";
  backgroundSizes: string[] = BackgroundSize.getAccessableProperty();
  backgroundPositions: string[] = BackgroundPosition.getAccessableProperty();
  backgroundRepeats: string[] = BackgroundRepeat.getAccessableProperty();
  backgroundAttachments: string[] = BackgroundAttachment.getAccessableProperty();
  file: File;
  idName = "text-property-modal";

  created() {
    this.imgEl = document.getElementById("product-image");
  }

  get hashID(): string {
    return this.idName;
  }

  async mounted() {}

  onChangePseudoSelector() {
    this.reinitManagers();
  }

  get backgroundImage(): string {
    return this.backgroundImageManager.getProperty().resource;
  }

  set backgroundImage(newVal: string) {
    let base64Img = newVal;
    let color = new UnitUrl();
    console.log(123456);

    // this.setPropertyToModel(new BackgroundImage(base64Img, color))
    // this.backgroundImageManager.getProperty().setResource(base64Img)
    this.backgroundImageManager.getProperty().file = this.file;
    // this.backgroundImageManager.getProperty().setValue(base64Img)
    this.backgroundImageManager.updateCssProp(
      this.backgroundImageManager.getProperty()
    );
  }

  deleteResource() {
    (<BackgroundImageProperty>(
      (<unknown>this.backgroundImageManager)
    )).deleteResource(this.backgroundImageManager.getProperty());
  }

  updateBackgroundImage() {
    this.backgroundImageManager.updateCssProp(
      this.backgroundImageManager.getProperty()
    );
  }

  get hasBackgroundImage(): boolean {
    return this.backgroundImageManager.getProperty().active;
  }

  set hasBackgroundImage(newVal: boolean) {
    if (!newVal) {
      this.backgroundImageManager.deactivePropCss(
        this.backgroundImageManager.getProperty()
      );
    } else {
      this.backgroundImageManager.activePropCss(
        this.backgroundImageManager.getProperty()
      );
    }
  }

  get backgroundSize() {
    return this.backgroundSizeManager.getProperty().blankValue;
  }

  set backgroundSize(newVal: string) {
    this.backgroundSizeManager.getProperty().setValue(newVal);
    this.backgroundSizeManager.updateCssProp(
      this.backgroundSizeManager.getProperty()
    );
  }

  get hasBackgroundSize() {
    return this.backgroundSizeManager.getProperty().active;
  }

  set hasBackgroundSize(newVal: boolean) {
    if (!newVal) {
      this.backgroundSizeManager.deactivePropCss(
        this.backgroundSizeManager.getProperty()
      );
    } else {
      this.backgroundSizeManager.activePropCss(
        this.backgroundSizeManager.getProperty()
      );
    }
  }

  get backgroundRepeat() {
    return this.backgroundRepeatManager.getProperty().blankValue;
  }

  set backgroundRepeat(newVal: string) {
    this.backgroundRepeatManager.getProperty().setValue(newVal);
    this.backgroundRepeatManager.updateCssProp(
      this.backgroundRepeatManager.getProperty()
    );
  }

  get hasBackgroundRepeat() {
    return this.backgroundRepeatManager.getProperty().active;
  }

  set hasBackgroundRepeat(newVal: boolean) {
    if (!newVal) {
      this.backgroundRepeatManager.deactivePropCss(
        this.backgroundRepeatManager.getProperty()
      );
    } else {
      this.backgroundRepeatManager.activePropCss(
        this.backgroundRepeatManager.getProperty()
      );
    }
  }

  get backgroundAttachment() {
    return this.backgroundAttachmentManager.getProperty().blankValue;
  }

  set backgroundAttachment(newVal: string) {
    this.backgroundAttachmentManager.getProperty().setValue(newVal);
    this.backgroundAttachmentManager.updateCssProp(
      this.backgroundAttachmentManager.getProperty()
    );
  }

  get hasBackgroundAttachment() {
    return this.backgroundAttachmentManager.getProperty().active;
  }

  set hasBackgroundAttachment(newVal: boolean) {
    if (!newVal) {
      this.backgroundAttachmentManager.deactivePropCss(
        this.backgroundAttachmentManager.getProperty()
      );
    } else {
      this.backgroundAttachmentManager.activePropCss(
        this.backgroundAttachmentManager.getProperty()
      );
    }
  }

  get hasBackgroundPosition() {
    return this.backgroundPositionManager.getProperty().active;
  }

  set hasBackgroundPosition(newVal: boolean) {
    if (!newVal) {
      this.backgroundPositionManager.deactivePropCss(
        this.backgroundPositionManager.getProperty()
      );
    } else {
      this.backgroundPositionManager.activePropCss(
        this.backgroundPositionManager.getProperty()
      );
    }
  }

  get backgroundPosition() {
    return this.backgroundPositionManager.getProperty().blankValue;
  }

  set backgroundPosition(newVal: string) {
    this.backgroundPositionManager.getProperty().setValue(newVal);
    this.backgroundPositionManager.updateCssProp(
      this.backgroundPositionManager.getProperty()
    );
  }

  set backgroundColorUnit(newVal: UnitColor) {
    this.backgroundImageManager.getProperty().setUnit(newVal);
  }

  get backgroundColorUnit(): UnitColor {
    return this.backgroundColorManager.getProperty().getUnit();
  }

  get backgroundColor() {
    var prop = this.getPropertyFromModel(BackgroundColor.PROP_NAME);
    return prop;
  }

  set backgroundColor(newVal) {
    var col: Color = <any>newVal;
    let red = col.rgba.r;
    let green = col.rgba.g;
    let blue = col.rgba.b;
    let alpha = col.rgba.a;
    let color = new RGBA();
    console.log(newVal);
    this.backgroundColorManager.getProperty().setUnit(color);
    this.backgroundColorManager.getProperty().setValue(col.rgba);
    this.backgroundColorManager.updateCssProp(
      this.backgroundColorManager.getProperty()
    );
  }

  get hasBackgroundColor(): boolean {
    return this.backgroundColorManager.getProperty().active;
  }

  set hasBackgroundColor(newVal: boolean) {
    if (!newVal) {
      this.backgroundColorManager.deactivePropCss(
        this.backgroundColorManager.getProperty()
      );
    } else {
      this.backgroundColorManager.activePropCss(
        this.backgroundColorManager.getProperty()
      );
    }
  }

  previewThumbnail(event) {
    var input = event.target;
    var that = this;
    //   this.formData.file = event.target.files[0]
    console.log(event.target.files);
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      console.log(event);
      console.log(event.target);
      console.log(event.target.files[0]);

      var reader = new FileReader();
      reader.onload = function (e) {
        // @ts-ignore
        that.backgroundImage = e.target.result;
        // el.imgUrl = e.target.result
        //   console.log(el)
        //              $('#logo-demo').attr('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  @Watch("pagination.page", { deep: false, immediate: false })
  async onPaginationChange(e) {}
}
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba($color: #d81121, $alpha: 0.4);
}
</style>
