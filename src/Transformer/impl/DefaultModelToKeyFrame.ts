import ModelToAsset from '../ModelToAsset';
import ModelToFontTace from '../ModelToFontTace';
import FontFaceModel from '../../../types/FontFaceModel';
import FontFace from '../../Fonts/FontFace';
import DefaultModelToAsset from './DefaultModelToAsset';
import SrcFont from '../../Fonts/SrcFont';
import KeyFrameModel from '../../../types/KeyFrameModel';
import KeyFrame from '../../Animation/KeyFrame';
import ModelToSelector from '../ModelToSelector';
import DefaultModelToSelector from './DefaultModelToSelector';
import ModelToKeyFrame from '../ModelToKeyFrame';
export default class DefaultModelToKeyFrame implements ModelToKeyFrame
{

    private selectorTransformer: ModelToSelector

    constructor()
    {
        this.selectorTransformer = new DefaultModelToSelector()
    }

    transform(model: KeyFrameModel): KeyFrame {
        var domain = new KeyFrame()
        // console.log(domain);

 
        domain.id = model.id
        domain.version = model.version
        domain.name = model.name
        domain.shortUuid = model.shortUuid

        // this.selectorTransformer.setDomainAsSrcFont(true)
        this.selectorTransformer.setWithKeyFrameSelectors()
        var srcList = []
        for (const srcEl of model.selectors) {
            let srcModel = this.selectorTransformer.transform(srcEl, domain)
            
            domain.selectorAccessor.addNewSelector(<>srcModel)
        }
// console.log('TRANS');
// console.log(domain);
// console.log(model);

        // domain.src = srcList


        return domain

    }

}
