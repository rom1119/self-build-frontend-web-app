
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import Left from '~/src/Site/Left';
import BorderModel from '../../../../src/Layout/Border/BorderModel';
import ActiveElController from "~/src/ActiveElController";

export default abstract class BorderComponent extends Vue {

    $refs: {

    }
    @Prop()
    value: BorderModel
    currentElement: BorderModel = null

    timeout = null
    mouseDown = false

    contextMenuName = 'cm-border'
    // abstract getSize() : number

    onMouseOver(borderComponent) {                
        borderComponent.$emit('borderMouseOver', borderComponent.value)

    }

    onMouseOut(borderComponent) {
        borderComponent.$emit('borderMouseOut', borderComponent.value)
    }
  
    public onMouseDown(borderComponent, ev: MouseEvent)
    {
        borderComponent.$emit('borderMouseDown', ev)
    }

    public onMouseUp(e: MouseEvent)
    {
        // console.log('qweqrewty');
    }

    public onMouseMove(e: MouseEvent)
    {

    }
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>