<template>

    <div class="content-item__elem_container ">
        <div class="content-item">
            <div style="display: inline-block; margin-left: 10px">
                <button @click="removeObj" class="btn btn-danger">DELETE</button><br>
                <button @click="addRect" class="btn btn-info">Rect</button><br>
                <button @click="addEllipse" class="btn btn-info">Ellipse</button><br>
                <button @click="addCircle" class="btn btn-info">Circle</button><br>
                <button @click="addLine" class="btn btn-info">Line</button><br>
                <button @click="addPolygon" class="btn btn-info">Polygon</button><br>
                <button @click="addText" class="btn btn-info">Text</button><br>

                <div  style="">
                    

                   
                    <label for="shape-color">Element color:</label>
                    <input type="color" @input="onChangeFill" :value="fill" id="shape-color"><br>

                    
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

        selectedShape: fabric.Canvas

        file: File
        idName = 'text-property-modal'

        fill = 'red'
        poligonChanging = false

        created() {
            this.imgEl = document.getElementById('product-image')
        }

        @Watch('enabled')
        onChangeEnabled(val) {
            console.log('enabled', val);
            if (val) {

            } else {
                this.selectedShape = null
                this.poligonChanging = false
            }
        }

        mounted()
        {
            // this.drawing()

            // this.canvas.on('selection:updated', (e) => {
            //     console.log('selected', e.target.type);
            //     // console.log('selected', e.target.fill);
            //     // console.log('selected2', this);
            //     // e.target.fill = 'red'
            //     this.selectedShape = e.target
            //     this.fill = e.target.fill
            // })

            this.onMouseDown()
            this.onEscapeKey()

        }

        removeObj() {
            this.canvas.getActiveObjects().forEach((obj) => {
                this.canvas.remove(obj)
            });
            this.canvas.renderAll();
        }
        addRect() {
            var el = new fabric.Rect({width: 100, height: 100, left: 100, top: 100, fill: 'green' });

            this.canvas.add(el)
            // this.canvas.renderAll()
        }
        
        addEllipse() {
            var el = new fabric.Ellipse({cx: 10, cy: 10, rx: 20, ry: 30, fill: 'red' });

            this.canvas.add(el)
        }

        addCircle() {
            var el = new fabric.Circle({
                left: 100,
                top: 100,                
                radius:10,
                stroke:'red',
                strokeWidth:5,
                fill: 'blue' 
                });

            this.canvas.add(el)
        }
        
        addPolygon() {
            var el = new fabric.Polygon(
                [
                    { x: 200, y: 10 },
                    { x: 250, y: 50 },
                    { x: 250, y: 180}
                ],
                { fill: 'red' , stroke: 'black', perPixelTargetFind: true, strokeWidth: 4 });

            this.canvas.add(el)
        }
        
        addLine() {
            var el = new fabric.Line([50, 100, 200, 200], {left: 100, top: 120, stroke: 'black' });

            this.canvas.add(el)
        }
        
        addText() {
            var el = new fabric.IText('example text', {x: 100, y: 120, fill: 'black' });

            this.canvas.add(el)
        }

        addPointToPolygon(evt) {
            var point, is_creating, mouse_dragging, shape, mouseCoords;

            mouseCoords = {
                x: this.canvas.getPointer(evt.e).x,
                y: this.canvas.getPointer(evt.e).y
            }

                console.log(mouseCoords)
            if (this.selectedShape instanceof fabric.Polygon) {
                shape = this.selectedShape

                for(var i=0; i < shape.points.length; i++) {
                    point = shape.points[i];
                    point.x += shape.minX + shape.width/2
                    point.y += shape.minY + shape.height/2
                    console.log(point);
                    console.error(shape);
                    console.error(shape.minX);
                    console.error( shape.width/2);
                }
                shape = this.canvas.getActiveObject()
                shape.points.push({x: mouseCoords.x, y: mouseCoords.y});
                shape._calcDimensions()
                // for(var i=0; i < shape.points.length; i++) {
                //     point = shape.points[i];
                //     console.error(shape.minX + shape.width/2);
                //     console.error(shape.minY + shape.height/2);
                //     console.error(shape.minY);
                //     console.error(shape.height/2);
                //     point.x -= shape.minX + shape.width/2
                //     point.y -= shape.minY + shape.height/2
                // }
                shape._calcDimensions()
            }
            this.canvas.renderAll()
        }

        onEscapeKey(){

            document.body.addEventListener("keydown", (e) => {
                // console.log(e.keyCode);
                if (e.keyCode == 27) {
                    this.canvas._activeObject = null
                    this.selectedShape = null
                    this.poligonChanging = false
                    this.canvas.renderAll()

                }
            }, false);

        }

        onMouseDown()
        {
            fabric.Object.prototype.objectCaching = false;
            
            var mouse_dragging, shape, mouseCoords;
            this.canvas.on('mouse:down', (evt) => {
                // console.log('this.getActiveObject')
                // console.log(this.canvas.getActiveObject())
                // console.log(this.canvas.getActiveObject() instanceof fabric.Polygon)
    
                if(!(this.selectedShape instanceof fabric.Polygon)) {
                    this.selectedShape = this.canvas.getActiveObject();
                }
                    // console.log('this.getActiveObject AFTER ', this.canvas.getActiveObject())

                this.canvas.renderAll()
            });
            this.canvas.on('mouse:up', (evt) => {
                var point
                mouseCoords = {
                    x: this.canvas.getPointer(evt.e).x,
                    y: this.canvas.getPointer(evt.e).y
                }
                    shape = this.selectedShape

                if(!(shape instanceof fabric.Polygon)) {
                    return
                }

                    // console.log(mouseCoords)
                // if (!is_creating) {
                //     // console.log('if')
                //     is_creating = true;
                //     shape = new fabric.Polygon([{x: mouseCoords.x, y: mouseCoords.y}, {x: mouseCoords.x+1, y: mouseCoords.y+1}], {fill: 'red', stroke: 'black', perPixelTargetFind: true, top: mouseCoords.y, left: mouseCoords.x, strokeWidth: 2});
                //     console.log(shape)
                //     this.canvas.add(shape);
                // }

                if (!this.poligonChanging) {
                    this.poligonChanging = true;
                } 
                else {
                    console.log('else')
                    console.log(mouseCoords)
                    console.log(shape)

                    var minX = isNaN(shape.minX) ? 0 : shape.minX
                    var minY = isNaN(shape.minY) ? 0 : shape.minY
                    // for(var i=0; i < shape.points.length; i++) {
                    //     point = shape.points[i];
                    //     console.log(shape.minX );
                    //     console.log(shape.width );
                    //     point.x += minX + shape.width/2
                    //     point.y += minY + shape.height/2
                    // }
                    shape.points.push({x: mouseCoords.x, y: mouseCoords.y});
                    shape._calcDimensions()
                    var minX = isNaN(shape.minX) ? 0 : shape.minX
                    var minY = isNaN(shape.minY) ? 0 : shape.minY
                    // for(var i=0; i < shape.points.length; i++) {
                    //     point = shape.points[i];
                    //     point.x -= minX + shape.width/2
                    //     point.y -= minY + shape.height/2
                    // }
                    // shape.left = minX;
                    // shape.top = minY;
                    shape.setCoords()
                }
                this.canvas.renderAll()
                this.canvas.setActiveObject(shape)
                shape = null

            });
        }
        
        

        get hashID(): string
        {
            return this.idName
        }

        

        onChangeFill(e) {
            // console.log('onChangeFill');
            // console.log(e.target.value);
            if(this.canvas.getActiveObject()) {
                // console.log('onChangeFill1111');
                // console.log(this.selectedShape);
                // console.log(this.fill);
                this.fill = e.target.value
                this.canvas.getActiveObject().fill = this.fill
                this.canvas.renderAll()
            }
        }

        generateSvg() 
        {
            var filterSvg = this.canvas.toSVG()
            return filterSvg
        }

        drawing(){
            // ts-ignore
            var component = this;
            (function(component) {
                var $ = function(id){return document.getElementById(id)};

                var canvas = component.canvas

                
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
