import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BaseChartDirective } from 'ng2-charts';


import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NzMessageModule,
    BaseChartDirective
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule { }
