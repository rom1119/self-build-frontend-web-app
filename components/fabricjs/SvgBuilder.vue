<template>

    <div class="container"  >
        <div class="content-item__elem_container ">
            <div class="content-item">
                    <button @click="selectedMode = modes.drawing" :class="{'active': selectedMode == modes.drawing}" id="drawing-mode" class="btn btn-info">Draving</button>
                    <button @click="selectedMode = modes.shapes" :class="{'active': selectedMode == modes.shapes}" id="shapes-mode" class="btn btn-info">Shapes</button>
                    <button id="clear-canvas" @click="clearCanvas" class="btn btn-info">Clear</button>
                </div>
            </div>
        <div class="content-item__elem_container ">
            
            <div class="content-item">
                <canvas id="svg-editor" style="border: 2px solid white; width: 400px;">
                </canvas>
                <button @click="generateSvg">
                    Generuj Svg
                </button>
            </div>
            <div class="content-item" v-if="canvas">
                <drawing v-show="selectedMode == modes.drawing"  :enabled="selectedMode == modes.drawing" :canvas="canvas" />
                <shapes v-show="selectedMode == modes.shapes"  :enabled="selectedMode == modes.shapes" :canvas="canvas" />
            </div>
        </div>
    
    </div>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import UnitUrl from '../../src/Unit/UnitUrl';
    import SvgTag from '~/src/Layout/tag/SvgTag';
    import Drawing from '~/components/fabricjs/parts/Drawing.vue';
    import Shapes from '~/components/fabricjs/parts/Shapes.vue';
    import { fabric } from 'fabric';
import Clear from '../../src/Css/Display/Clear';

    // let Chrome = ColourPicker.Chrome


    interface colorObject {
        r, g, b, a
    }

    interface Color {
        rgba: colorObject
    }

    @Component(
        {
            components: {
                Drawing, Shapes
            }
        }
    )
    export default class SvgBuilder extends Vue {
      // svg += '</svg>'
        
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'

        @Prop({ default: "", required: true })
        value: string

        file: File
        idName = 'text-property-modal'

        canvas = null

        modes = {
            drawing: 'drawing-mode',
            shapes: 'shapes-mode',
        }

        selectedMode = this.modes.shapes

        created() {
            this.imgEl = document.getElementById('product-image')
        }


        get hashID(): string
        {
            return this.idName
        }

        public updateSvg(val)
        {
            console.log('change val');
            // var svg = '<svg>'
            // svg += val
            // svg += '</svg>'
            // if (val) {
            try {
                fabric.loadSVGFromString(val, (objects, options) =>{
                    // var svgData = fabric.util.groupSVGElements(objects, options);
                    // svgData.top = 30;
                    // svgData.left = 50;
                    this.canvas.add(...objects);
                });
                
            } catch (e) {
                console.error('load SVG PROBLEM', e) 
                this.canvas.clear()
            }

            // }
        }


        clearCanvas() {
            this.canvas.clear()
        }

        mounted()
        {
           this.canvas = new fabric.Canvas('svg-editor', {
                width: 700,
                height: 300,
                isDrawingMode: false
            });
            // console.trace('mounted SVG BUILDER');
            // console.log(this.value);
            // var svg = '<svg>'
            var svg = this.value
            // svg += '</svg>'
            if (svg) {
                try {
                    fabric.loadSVGFromString(svg, (objects, options) =>{
                        // var svgData = fabric.util.groupSVGElements(objects, options);
                        // svgData.top = 30;
                        // svgData.left = 50;
                        this.canvas.add(...objects);
                    });
                
                } catch (e) {
                    console.error('load SVG PROBLEM', e) 
                }

            }
            this.canvas.on('after:render', (event) => {
                // console.log('modify')
                // console.log(event)
                var res = this.generateSvg()

                this.$emit('changeSvg', res)
            })
        }

        filterSvg(textblock) {
            var lines = textblock.split('\n');
            // remove one line, starting at the first position
            // lines.splice(lines.length - 1, 1);
            // lines.splice(0,3);
            // join the array back into a single string
            var newtext = lines.join('\n');

            return textblock
        }
        generateSvg() 
        {
            var filterSvg = this.canvas.toSVG()
            // console.log(filterSvg);
            // console.log(this.canvas.toSVG());
            // this.svgContenComp = filterSvg

            return filterSvg
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: rgba($color: #13c50d, $alpha: 1) !important;
    }
</style>
