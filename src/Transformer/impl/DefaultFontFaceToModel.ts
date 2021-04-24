import AssetToModel from '../AssetToModel';
import FontFaceToModel from '../FontFaceToModel';
import FontFaceModel from '../../../types/FontFaceModel';
import FontFace from '../../Fonts/FontFace';
import DefaultAssetToModel from './DefaultAssetToModel';
export default class DefaultFontFaceToModel implements FontFaceToModel
{
    private assetTransformer: AssetToModel

    constructor()
    {

        this.assetTransformer = new DefaultAssetToModel()
    }

    transform(domain: FontFace): FontFaceModel {
        // var value = domain.getClearValue()
        // if (typeof value === 'object') {
        //     value = JSON.stringify(value)
        // }
        let model = new FontFaceModel()
        model.id = domain.id
        model.version = domain.version
        model.name = domain.name

        var srcList = []
        for (const srcEl of domain.src) {
            let srcModel = this.assetTransformer.transform(srcEl)
            
            srcList.push(srcModel)
        }

        
        
        model.src = srcList
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
