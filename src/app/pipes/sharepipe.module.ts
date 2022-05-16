import { NgModule } from '@angular/core';
import { MomentPipe } from './moment.pipe';
import { DateFormatPipe } from './date';


@NgModule({
	declarations: [
        MomentPipe,
        DateFormatPipe
	],
    imports: [],
    
    exports: [
       
        MomentPipe,
        DateFormatPipe
    ]
})

export class SharePipesModule {}