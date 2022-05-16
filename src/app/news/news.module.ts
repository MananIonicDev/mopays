import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewsPageRoutingModule } from './news-routing.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NewsPage } from './news.page';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { NewsCategoryPage } from '../news-category/news-category.page';
import { LatestPage } from '../latest/latest.page';
//import { NewshomePage } from '../newshome/newshome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SuperTabsModule,
    SharePipesModule,
    IonicModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPage, NewsCategoryPage, LatestPage],
  entryComponents: [NewsCategoryPage, LatestPage]

})
export class NewsPageModule {}
