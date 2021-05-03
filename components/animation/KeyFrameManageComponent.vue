<template>

    <div class="component-manage h100" >
        <div class="component-manage__content h100" style="display: flex; flex-direction: column;">
            <div class="" style="display: flex;flex-direction: row;">
                <div
                class="content-item-half"
                >
                    <div class="content-item__header rel">
                        <span class=" btn" @click="addNewKeyFrame"> Dodaj Animację </span>
                    </div>
                </div>
                <div
                class="content-item-half"
                >
                    <div class="content-item__header rel">
                        <template v-if="animationCreator">
                            <div v-if="canStartManageAnimation" class="rel" style=" left: 0;">
                                <span class="btn btn_red " @click="startManageAnimation"> Rozpocznij edycję animacji </span>
                            </div>
                            <div v-if="animationIsStarted" class="rel" style=" left: 0;">
                                <span class="btn btn_red " @click="endManageAnimation"> Zakończ edycję animacji </span>
                            </div>     
                            
                        </template>
                    </div>
                </div>
            </div>
            <div class="container " style="overflow: scroll;">
            
                <div 
                    v-for="keyFrame in accessor.all" 
                    :key="keyFrame.id" 
                    :class="{'active-key-frame': isSelectedKeyFrameToManage(keyFrame)}" 
                    class="content-item-left green-b p-2">
                    
                    <div class=" content-item rel">
                        
                        <span class="font-b">
                            ilosc użytych animacji: {{ keyFrame.countOwners }}
                        
                        </span>    
                        <br>
                        
                        <div>
                            Nazwa animacji:

                            <input type="text" class="w90" @input="changeKeyFrame(keyFrame)" v-model="keyFrame.name" :name="'name' + keyFrame.id">
                            <span class="p-abs" style="top: 10px; right: 0;">
                                <span class="btn btn_red btn_sm" @click="removeKeyFrame(keyFrame)"> USUN Animację </span>
                            </span>
                        </div>

                    </div>
                        <div v-if="canAddSelector(keyFrame)" class="content-item__header rel">
                            <button class="right-btn btn btn_sm" @click="addSelector(keyFrame)"> DODAJ KLATKĘ </button>
                            <label class="lab">Procentowa poklatka
                                <input type="checkbox" name="percentSelector" v-model="keyFrame.isPercentSelector">
                            </label>
                            <br>
                            <span v-show="keyFrame.addSelectorError" class="error">
                                {{ keyFrame.addSelectorError }}
                            </span>
                        </div>
                        <div class="rel content-item">
                            Klatki animacji : 
                             <button class="right-btn btn btn_sm" style="top: 10px;" @click="keyFrame.toggleSelectors()"> 
                             <template v-if="keyFrame.selectorsShow">
                                close
                             </template>
                             <template v-else>
                                open
                             </template>
                             </button>
                        </div>
                    <div class="content-item  m-1 rel" style="background: rgb(25 24 24);" 
                        v-show="keyFrame.selectorsShow" 
                        v-for="selector, key in keyFrame.selectorAccessor.all" 
                        :class="{'active-selector': isSelectedSelectorToManage(selector)}" 

                        :key="selector.id">
                        <span style="left: 0px;" class="p-abs lab">
                            {{ key + 1 }}.
                        </span>
                        <span 
                            class="add-btn btn btn_sm" 
                            style="left: 10%;"
                            v-if="canSelectSelector(selector)" 
                            @click="selectKeyFrameSelectorManage(selector)"> Zarządzaj klatką 
                        </span>
                        <span 
                            class="btn_red rel btn btn_sm" 
                            style="left: 10%;"
                            v-if="isSelectedSelectorToManage(selector) && !animationIsStarted" 
                            @click="unselectAnimationSelectorManage(selector)"
                        > Odznacz klatkę </span>
                        <span class="p-abs" style="right: 0px;">
                            <span class="btn btn_red  btn_sm" @click="removeSelector(keyFrame, selector)"> USUN KLATKĘ </span>
                        </span>
                        </br>
                        <code >
                            <span v-if="selector.isPercent">
                                <input type="text" style="width: 30px;" @input="onChangeSelector(selector)" name="isPercentSelector" v-model="selector.val">% 
                            </span>
                            <span v-else class="font-10" style="color: #f14d4d;">
                                {{  selector.getValue() }} 
                            </span>
                            {
                            <div class="w-100 m-1 rel font-10" >
                                    <div  
                                        v-for="css, k in selector.cssAccessor.all" 
                                        :key="k" style="margin-left: 10px;">
                                        <span style="color: #0ce00c;">
                                            {{ css.getName() }}
                                        </span> : 
                                        <span style="color: #f14d4d;">
                                            {{ css.getValue() }} ;
                                        </span>
                                        <button @click="removeCssFromSelector(selector, css)" class="rm-style">X</button>
                                    </div>
                            </div>
                            }
                        </code>
                        
                        
                        
                    </div>
                </div> 
            </div>  
        </div>  
    </div>  
            


</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
import UnitUrl from '../../src/Unit/UnitUrl';
import FontFaceModal from '../FontFaceModal';
import SrcFont from '~/src/Fonts/SrcFont';
import FontFace from '~/src/Fonts/FontFace';
import FontFaceAccessor from '~/src/Fonts/FontFaceAccessor';
import KeyFrameManage from './KeyFrameManage';
import KeyFrame from '~/src/Animation/KeyFrame';
import KeyFrameAccessor from '~/src/Animation/KeyFrameAccessor';
import KeyFrameSelector from '~/src/Animation/KeyFrameSelector';
import SelectorFactoryFromName from '~/src/Factory/SelectorFactoryFromName';
import KeyFrameSelectorFactory from '../../src/Animation/KeyFrameSelectorFactory';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import {css} from 'js-beautify';
import BasePropertyCss from '../../src/Css/BasePropertyCss';
import AnimationCreator from '~/src/Animation/AnimationCreator';

// let Chrome = ColourPicker.Chrome


interface colorObject {
    r, g, b, a
}

interface Color {
    rgba: colorObject
}

    @Component
    export default class KeyFrameManageComponent extends KeyFrameManage {
        
        formatsFont = ['woff', 'woff2', 'truetype', 'opentype', 'embedded-opentype', 'svg']
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'
        idName = 'text-property-modal'
        keyFrameSelectorFactory: KeyFrameSelectorFactory = null


        animationCreator: AnimationCreator = null
        // cssSelector(selector: KeyFrameSelector) {
        //     var strCss = selector.getValue()
        //     strCss += '{ \n'

        //     for (const css of selector.cssAccessor.all ) {
        //         strCss += css.getName() + ': ' +css.getValue() + '; \n'
        //     }
        //         strCss += '} \n'
        //     console.log('cssSelector');
        //     console.log(strCss);
        //     return  hljs.highlight('css',css(strCss )).value
        // }
        created() {
            this.imgEl = document.getElementById('product-image')
        }

        get canSelectAnimation() 
        {
            return this.animationCreator.canSelectToManageAnimation
        }
        
        get canStartManageAnimation() 
        {
            return this.animationCreator.canStartManageAnimation
        }
        
        get animationIsStarted() 
        {
            return this.animationCreator.animationIsStarted
        }

        canSelectSelector(selector: KeyFrameSelector) {
            return this.animationCreator.canSelectSelector(selector)

        }

        isSelectedKeyFrameToManage(keyFrame: KeyFrame) {
            return this.animationCreator.isSelectedKeyFrameToManage(keyFrame)

        }
        
        isSelectedSelectorToManage(selector: KeyFrameSelector) {
            return this.animationCreator.isSelectedSelectorToManage(selector)

        }

        startManageAnimation()
        {
            // console.log(this.animationCreator);
            this.animationCreator.startManageAnimation()
        }
        
        endManageAnimation()
        {
            // console.log(this.animationCreator);
            this.animationCreator.endManageAnimation()
        }

        selectAnimationManage(keyFrame: KeyFrame)
        {
            console.log(this.animationCreator);
            this.animationCreator.selectKeyFrame(keyFrame)
        }
        
        unselectAnimationManage(keyFrame: KeyFrame)
        {
            // console.log(this.animationCreator);
            this.animationCreator.unselectKeyFrame(keyFrame)
        }
        
        unselectAnimationSelectorManage(selector: KeyFrameSelector)
        {
            // console.log(this.animationCreator);
            this.animationCreator.unselectKeyFrameSelector(selector)
            this.animationCreator.unselectKeyFrame()

        }
        
        selectKeyFrameSelectorManage(selector: KeyFrameSelector)
        {
            console.log(this.animationCreator);
            this.animationCreator.selectKeyFrameSelector(selector)
            this.animationCreator.selectKeyFrame(selector.keyFrame)

        }


        canAddSelector(keyFrame: KeyFrame): boolean
        {

            return this.keyFrameSelectorFactory.canCreateFor(keyFrame)
        }

        mounted()
        {
            this.keyFrameSelectorFactory = new KeyFrameSelectorFactory()
            this.animationCreator = AnimationCreator.getInstance()

            // console.log('mounted KeyFrameManageComponent');
            // console.log(this.accessor);
            // this.managers = 
        }

        removeCssFromSelector(selector: KeyFrameSelector, css: BasePropertyCss) {
            console.log('removeCssFromSelector');
            selector.cssAccessor.removePropWithName(css.getName())
            this.onChangeSelector(selector)
        }

        onChangeSelector(sel: KeyFrameSelector)
        {
            sel.synchronize()
        }

        changeKeyFrame(keyFrame: KeyFrame) {
            keyFrame.synchronize()
            
        }

        onChangePseudoSelector()
        {
            // this.reinitManagers()
        }

        changeFont(font: KeyFrame){
            this.accessor.updateKeyFrame(font)
        }

        addNewKeyFrame() {
            this.accessor.addAndSave(KeyFrameAccessor.NEW_DEFAULT_INSTANCE())
        }

        addFont(font: KeyFrame) {
            // console.trace(font)
            this.accessor.addKeyFrame(font)
        }
        
        removeFont(font: KeyFrame) {
            if (font.isUsedInAnimationCss()) {
                var confirm = window.confirm('Uwaga, ta animacja jest używana, czy mimo to chcesz ją usunąć ?')

                if (confirm) {
                    // console.log('USUN');
                    this.accessor.removeKeyFrame(font)
                } else {
                    // console.log('NIE USUWAJ');

                }
            }
        }
        addSelector(font: KeyFrame) {
            var fontSrc
            try {
                fontSrc = this.keyFrameSelectorFactory.createNew(font, font.isPercentSelector)
                this.accessor.addSelectorAndSave(font, fontSrc)

            } catch (e) {
                console.log('addSelector ERR');
                font.addSelectorError = 'Nie możesz dodać poklatki, usuń jedną '
            }
            console.log('addSelector');
            console.log(fontSrc);
        }
        
        removeSelector(font: KeyFrame, src: KeyFrameSelector) {
            this.accessor.removeSelector(font, src)
        }
        
        


        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }


    }
</script>

<style lang="scss" scoped> 
    .font-10 {
        font-size: 12px;
    }

    .active-key-frame {
        border: 4px solid red;

    }
    
    .active-selector {
        border: 4px solid rgb(247, 22, 228);
    }

    .rm-style {
        font-size: 10px;
        color: white;
        background-color: #d81121;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        bottom: 1px solid black;
        box-shadow: inset 0 0 4px #44df25;
        &:hover {
            background-color: #ff707c;

        }
    }
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
</style>
