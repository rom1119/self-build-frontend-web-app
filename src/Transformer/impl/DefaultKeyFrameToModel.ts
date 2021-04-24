import AssetToModel from '../AssetToModel';
import FontFaceToModel from '../FontFaceToModel';
import FontFaceModel from '../../../types/FontFaceModel';
import FontFace from '../../Fonts/FontFace';
import DefaultAssetToModel from './DefaultAssetToModel';
import KeyFrameToModel from '../KeyFrameToModel';
import SelectorToModel from '../SelectorToModel';
import DefaultSelectorToModel from './DefaultSelectorToModel';
import KeyFrameModel from '../../../types/KeyFrameModel';
import KeyFrame from '../../Animation/KeyFrame';
export default class DefaultKeyFrameToModel implements KeyFrameToModel
{
    private selectorTransformer: SelectorToModel

    constructor()
    {

        this.selectorTransformer = new DefaultSelectorToModel()
    }

    transform(domain: KeyFrame): KeyFrameModel {
        // var value = domain.getClearValue()
        // if (typeof value === 'object') {
        //     value = JSON.stringify(value)
        // }
        let model = new KeyFrameModel()
        model.id = domain.id
        model.version = domain.version
        model.name = domain.name
        model.shortUuid = domain.shortUuid

        var srcList = []
        for (const srcEl of domain.selectorAccessor.all) {
            let srcModel = this.selectorTransformer.transform(srcEl)
            
            srcList.push(srcModel)
        }

        
        
        model.selectors = srcList
        console.log('TRASFORM');
        console.log(domain);

        // @ts-ignore

        // this.cssFactoryFromName.create(model.getKey())
        // var unit = this.unitCssFactoryFromName.create(model.getUnitName())
        // domain.setValue(model.getValue())
        // domain.setUnit(unit)
        // domain.id = model.id

        // console.log(domain);

        return model

    }



}
