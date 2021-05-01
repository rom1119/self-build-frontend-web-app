import SelectorFactoryFromName from '../Factory/SelectorFactoryFromName';
import KeyFrameSelector from './KeyFrameSelector';
import KeyFrame from './KeyFrame';
import { FromKeyFrameSelector } from './keyFrameSelectors/index';
import ToKeyFrameSelector from './keyFrameSelectors/ToKeyFrameSelector';
import PercentKeyFrameSelector from './keyFrameSelectors/PercentKeyFrameSelector';
export default class KeyFrameSelectorFactory {

    protected selectorFactoryFromName: SelectorFactoryFromName = null

    constructor() {
        this.selectorFactoryFromName = new SelectorFactoryFromName()

    }

    public canCreateFor(keyFrame: KeyFrame): boolean {

        for (const sel of keyFrame.selectorAccessor.all) {
            
            if (sel instanceof ToKeyFrameSelector) {
                return false
            }
            
            if (sel instanceof PercentKeyFrameSelector) {
                if (sel.val == 100) {
                    return false
                }
            }
        }

        return true
    }
    public createNew(keyFrame: KeyFrame, wantPercent?: boolean): KeyFrameSelector {
        
        var hasFrom = false
        var hasTo = false
        var hasLast100Percent = false
        var lastPercent: PercentKeyFrameSelector = null

        for (const sel of keyFrame.selectorAccessor.all) {
            if (sel instanceof FromKeyFrameSelector) {
                hasFrom = true
            }
            
            if (sel instanceof ToKeyFrameSelector) {
                hasTo = true
            }
            
            if (sel instanceof PercentKeyFrameSelector) {
                if (sel.val == 100) {
                    hasLast100Percent = true

                }
                lastPercent = sel
            }
        }

        if (!hasFrom) {
            return new FromKeyFrameSelector()
        }
        
        if (wantPercent) {
            if (!hasTo && !hasLast100Percent) {
                var per = new PercentKeyFrameSelector()
                per.val = 10
                if (lastPercent) {
                    per.val = lastPercent.val + 10
                }
                if (per.val >= 100 ) {
                    per.val = 100
                }
                return per

            }
            throw Error('Can not create KeyFrameSelector because you have 100% selector added')

            
        }
        if (!hasTo) {
            return new ToKeyFrameSelector()
        }

        throw Error('Can not create KeyFrameSelector because you have TO selector added  as last')


    }
    
    public createFromName(name: string): KeyFrameSelector {
        
        var sel = this.selectorFactoryFromName.create(name)

        if (!(sel instanceof KeyFrameSelector)) {
            throw Error('Can not create KeyFrameSelector from name ' + name)
        }

        return <KeyFrameSelector>sel
        
    }
}