<template>

    <div class="content-item__elem_container ">
        <div class="content-item">
            <div style="display: inline-block; margin-left: 10px">

                <div id="drawing-mode-options" style="">
                    <label for="drawing-mode-selector">Mode:</label>
                    <select id="drawing-mode-selector">
                    <option>Pencil</option>
                    <option>Circle</option>
                    <option>Spray</option>
                    <option>Pattern</option>

                    <option>hline</option>
                    <option>vline</option>
                    <option>square</option>
                    <option>diamond</option>
                    <option>texture</option>
                    </select><br>

                    <label for="drawing-line-width">Line width:</label>
                    <span class="info">31</span><input type="range" value="10" min="0" max="150" id="drawing-line-width"><br>

                    <label for="drawing-color">Line color:</label>
                    <input type="color" value="#005E7A" id="drawing-color"><br>

                    <label for="drawing-shadow-color">Shadow color:</label>
                    <input type="color" value="#005E7A" id="drawing-shadow-color"><br>

                    <label for="drawing-shadow-width">Shadow width:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-width"><br>

                    <label for="drawing-shadow-offset">Shadow offset:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-offset"><br>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import SvgTag from '~/src/Layout/tag/SvgTag';
    import { fabric } from 'fabric';

    // let Chrome = ColourPicker.Chrome


    interface colorObject {
        r, g, b, a
    }

    interface Color {
        rgba: colorObject
    }

    @Component
    export default class Drawing extends Vue {
      // svg += '</svg>'
        
        timeout
        imgEl
        // value: HtmlTag
        colour = '#fff'

        @Prop({ default: "", required: true })
        canvas: fabric.Canvas
        
        @Prop({ default: false, required: true })
        enabled: boolean

        file: File
        idName = 'text-property-modal'


        created() {
            this.imgEl = document.getElementById('product-image')
        }

        get hashID(): string
        {
            return this.idName
        }

        mounted()
        {
            this.drawing()
            console.log('mounted drawing');

        }
        generateSvg() 
        {
            var filterSvg = this.canvas.toSVG()
            return filterSvg
        }

        @Watch('enabled')
        onChangeEnabled(val) {
            console.log('enabled', val);
            if (val) {
                this.canvas.isDrawingMode = true

            } else {
                this.canvas.isDrawingMode = false

            }
        }

        drawing(){
            // ts-ignore
            var component = this;
            (function(component) {
                var $ = function(id){return document.getElementById(id)};

                var canvas = component.canvas
                fabric.Object.prototype.transparentCorners = false;

                var drawingModeEl = $('drawing-mode'),
                    drawingOptionsEl = $('drawing-mode-options'),
                    drawingColorEl = $('drawing-color'),
                    drawingShadowColorEl = $('drawing-shadow-color'),
                    drawingLineWidthEl = $('drawing-line-width'),
                    drawingShadowWidth = $('drawing-shadow-width'),
                    drawingShadowOffset = $('drawing-shadow-offset');
                    


                

                if (fabric.PatternBrush) {
                    var vLinePatternBrush = new fabric.PatternBrush(canvas);
                    vLinePatternBrush.getPatternSrc = function() {

                        var patternCanvas = fabric.document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = 10;
                        var ctx = patternCanvas.getContext('2d');

                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(0, 5);
                        ctx.lineTo(10, 5);
                        ctx.closePath();
                        ctx.stroke();

                        return patternCanvas;
                    };

                    var hLinePatternBrush = new fabric.PatternBrush(canvas);
                    hLinePatternBrush.getPatternSrc = function() {

                        var patternCanvas = fabric.document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = 10;
                        var ctx = patternCanvas.getContext('2d');

                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(5, 0);
                        ctx.lineTo(5, 10);
                        ctx.closePath();
                        ctx.stroke();

                        return patternCanvas;
                    };

                    var squarePatternBrush = new fabric.PatternBrush(canvas);
                    squarePatternBrush.getPatternSrc = function() {

                        var squareWidth = 10, squareDistance = 2;

                        var patternCanvas = fabric.document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                        var ctx = patternCanvas.getContext('2d');

                        ctx.fillStyle = this.color;
                        ctx.fillRect(0, 0, squareWidth, squareWidth);

                        return patternCanvas;
                    };

                    var diamondPatternBrush = new fabric.PatternBrush(canvas);
                    diamondPatternBrush.getPatternSrc = function() {

                        var squareWidth = 10, squareDistance = 5;
                        var patternCanvas = fabric.document.createElement('canvas');
                        var rect = new fabric.Rect({
                            width: squareWidth,
                            height: squareWidth,
                            angle: 45,
                            fill: this.color
                        });

                        var canvasWidth = rect.getBoundingRect().width;

                        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

                        var ctx = patternCanvas.getContext('2d');
                        rect.render(ctx);

                        return patternCanvas;
                    };

                    var img = new Image();
                    img.src = '~/assets/img/honey_im_subtle.png';

                    var texturePatternBrush = new fabric.PatternBrush(canvas);
                    texturePatternBrush.source = img;
                }
                // console.log('canvas')
                // console.log(canvas)
                canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas)

                

                $('drawing-mode-selector').onchange = function() {
                    
                    // ts-ignore
                    if (this.value === 'hline') {
                    canvas.freeDrawingBrush = vLinePatternBrush;
                    }
                    else if (this.value === 'vline') {
                    canvas.freeDrawingBrush = hLinePatternBrush;
                    }
                    else if (this.value === 'square') {
                    canvas.freeDrawingBrush = squarePatternBrush;
                    }
                    else if (this.value === 'diamond') {
                    canvas.freeDrawingBrush = diamondPatternBrush;
                    }
                    else if (this.value === 'texture') {
                    canvas.freeDrawingBrush = texturePatternBrush;
                    }
                    else {
                    canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
                    }

                    if (canvas.freeDrawingBrush) {
                        var brush = canvas.freeDrawingBrush;
                        brush.color = drawingColorEl.value;
                        if (brush.getPatternSrc) {
                            brush.source = brush.getPatternSrc.call(brush);
                        }
                        brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
                        brush.shadow = new fabric.Shadow({
                            blur: parseInt(drawingShadowWidth.value, 10) || 0,
                            offsetX: 0,
                            offsetY: 0,
                            affectStroke: true,
                            color: drawingShadowColorEl.value,
                        });
                    }
                };

                drawingColorEl.onchange = function() {
                    var brush = canvas.freeDrawingBrush;
                    brush.color = this.value;
                    if (brush.getPatternSrc) {
                    brush.source = brush.getPatternSrc.call(brush);
                    }
                };
                drawingShadowColorEl.onchange = function() {
                    canvas.freeDrawingBrush.shadow.color = this.value;
                };
                drawingLineWidthEl.onchange = function() {
                    // console.log(canvas);
                    // console.log(canvas.freeDrawingBrush);
                    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
                    this.previousSibling.innerHTML = this.value;
                };
                drawingShadowWidth.onchange = function() {
                    canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
                    this.previousSibling.innerHTML = this.value;
                };
                drawingShadowOffset.onchange = function() {
                    canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
                    canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
                    this.previousSibling.innerHTML = this.value;
                };

                if (canvas.freeDrawingBrush) {
                    canvas.freeDrawingBrush.color = drawingColorEl.value;
                    console.log(canvas.freeDrawingBrush)
                    if (canvas.freeDrawingBrush.getPatternSrc) {
                        canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(canvas.freeDrawingBrush);

                    }
                    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
                    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                    blur: parseInt(drawingShadowWidth.value, 10) || 0,
                    offsetX: 0,
                    offsetY: 0,
                    affectStroke: true,
                    color: drawingShadowColorEl.value,
                    });
                }
                })(component);
        }

        onChangePseudoSelector()
        {
            // this.reinitManagers()
        }


        
        
        
        // private setPropUnit(newVal, prop: BasePropertyCss){
        //     if (!prop.isActive()) {
        //         return
        //     }
        //     if (!newVal) {
        //         return
        //     }
        //     // console.log('SET paddingUnitGlobal', newVal);
        //     var newUnit = this.getUnitByName(this.allUnits, newVal)
        //     // this.updateUnitInModel(newUnit, MarginCss.PROP_NAME)
        //     prop.setUnit(newUnit)
        //     this.updateCssPropWithMarginFilter(prop)

        // }

        // private setProp(newVal, prop: BasePropertyCss)
        // {
        //     if (!prop) {
        //         return
        //     }
        //     if (!prop.isActive()) {
        //         return
        //     }
        //     if (!newVal) {
        //         return
        //     }
        //     prop.setValue(newVal.toString())
        //     var a = this.updateCssPropWithMarginFilter(prop)
        // }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }




    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
</style>
