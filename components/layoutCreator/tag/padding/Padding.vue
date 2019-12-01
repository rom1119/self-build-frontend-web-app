
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import Left from '~/src/Site/Left';
import BorderModel from '../../../../src/Layout/Border/BorderModel';
import XPositionDetector from '~/src/PositionDetector/XPositionDetector';
import ActiveElController from "~/src/ActiveElController";
import AxisPositionDetector from '../../../../src/AxisPositionDetector';

export default abstract class PaddingComponent extends Vue {

    $refs: {

    }
    @Prop()
    value: BorderModel
    currentElement: BorderModel = null

    timeout = null
    mouseDown = false

    contextMenuName = 'cm-border'

    abstract getMouseDetector() : AxisPositionDetector
    abstract getMouseAxisPosition(e) : number
    // abstract getSize() : number


    onMouseOver(borderComponent) {                
        borderComponent.$emit('paddingMouseOver', borderComponent.value)

    }

    onMouseOut(borderComponent) {
        borderComponent.$emit('paddingMouseOut', borderComponent.value)
    }

    public onMouseDown(ev: MouseEvent)
    {
        this.mouseDown = true
        let el = this.value
        let event = ev
        console.log('aaaaa');
        
        // console.log(el.innerText);
        
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    this.currentElement = el
                    // let compStyles = window.getComputedStyle(el.htmlEl);
                    // var comp = compStyles.getPropertyValue('width')
                    // console.log('aa');
                    
                    this.getMouseDetector().initPosition(this.getMouseAxisPosition(event))
                    this.getMouseDetector().initSize(el.width)
                    this.currentElement.changeAsActiveSize()

                }

            }, 400)
    }
    
    

    public onMouseUp(e: MouseEvent)
    {
        // console.log('qweqrewty');
        this.mouseDown = false
        if (this.currentElement == null) {
            return
        }
        this.currentElement.changeAsDeactiveSize()
        this.currentElement = null
        
    }

    public onMouseMove(e: MouseEvent)
    {
        
        if (this.currentElement == null) {
            return
        }
        // console.log(e.clientX);
        this.getMouseDetector().setAxisPosition(this.getMouseAxisPosition(e)) 
        // this.getMouseDetector().y = e.clientY
        this.currentElement.initSize(this.getMouseDetector().computedVal())

    }
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>