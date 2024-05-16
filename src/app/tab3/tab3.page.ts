import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ECharts, EChartsOption, XAXisComponentOption } from 'echarts';
import { ImageService } from '../services/image.service';
import { Foto } from '../interfaces/foto';
import { ThemeOption } from 'ngx-echarts';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  coolTheme = {
    color: [
      '#b21ab4',
      '#6f0099',
      '#2a2073',
      '#0b5ea8',
      '#17aecc',
      '#b3b3ff',
      '#eb99ff',
      '#fae6ff',
      '#e6f2ff',
      '#eeeeee',
    ],

    title: {
      fontWeight: 'normal',
      color: '#00aecd',
    },

    visualMap: {
      color: ['#00aecd', '#a2d4e6'],
    },

    toolbox: {
      color: ['#00aecd', '#00aecd', '#00aecd', '#00aecd'],
    },

    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      axisPointer: {
        // Axis indicator, coordinate trigger effective
        type: 'line', // The default is a straight line： 'line' | 'shadow'
        lineStyle: {
          // Straight line indicator style settings
          color: '#00aecd',
          type: 'dashed',
        },
        crossStyle: {
          color: '#00aecd',
        },
        shadowStyle: {
          // Shadow indicator style settings
          color: 'rgba(200,200,200,0.3)',
        },
      },
    },

    // Area scaling controller
    dataZoom: {
      dataBackgroundColor: '#eee', // Data background color
      fillerColor: 'rgba(144,197,237,0.2)', // Fill the color
      handleColor: '#00aecd', // Handle color
    },

    timeline: {
      lineStyle: {
        color: '#00aecd',
      },
      controlStyle: {
        color: '#00aecd',
        borderColor: '00aecd',
      },
    },

    candlestick: {
      itemStyle: {
        color: '#00aecd',
        color0: '#a2d4e6',
      },
      lineStyle: {
        width: 1,
        color: '#00aecd',
        color0: '#a2d4e6',
      },
      areaStyle: {
        color: '#b21ab4',
        color0: '#0b5ea8',
      },
    },

    chord: {
      padding: 4,
      itemStyle: {
        color: '#b21ab4',
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.5)',
      },
      lineStyle: {
        color: 'rgba(128, 128, 128, 0.5)',
      },
      areaStyle: {
        color: '#0b5ea8',
      },
    },

    graph: {
      itemStyle: {
        color: '#b21ab4',
      },
      linkStyle: {
        color: '#2a2073',
      },
    },

    map: {
      itemStyle: {
        color: '#c12e34',
      },
      areaStyle: {
        color: '#ddd',
      },
      label: {
        color: '#c12e34',
      },
    },

    gauge: {
      axisLine: {
        lineStyle: {
          color: [
            [0.2, '#dddddd'],
            [0.8, '#00aecd'],
            [1, '#f5ccff'],
          ],
          width: 8,
        },
      },
    },
  };


  //////////////////////////

  initOptsFeas = {
    renderer: 'svg',
    width: 300,
    height: 300,
  };

  optionsFeas!: EChartsOption;

  /// pie test

  theme!: string | ThemeOption;
  // coolTheme = CoolTheme;
  optionsLindas!: EChartsOption;




  public fotosFeas: Foto[] = [];
  public fotosLindas: Foto[] = [];
  public xF: any[] = [];
  public xL: any[] = [];

  constructor(private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.fotosFeas = [];
    this.fotosLindas = [];
    this.imageService.traer()
      .subscribe(fotos => {
        fotos.forEach(f => {
          console.log(f);

          if (f.tipo == "fea") {
            this.fotosFeas.push(f);
          } else {
            this.fotosLindas.push(f);
          }
        });
        console.log(this.fotosLindas);

        const yL: any = [];
        const seriesLindas: any = [];
        this.fotosLindas.forEach(f => {
          this.xL.push(`<img src="{f.url}" alt="{f.id}" style="width: 100%;">`)
          yL.push(this.contabilizarFoto(f));
          yL.push(this.contabilizarFoto(f))
          seriesLindas.push(
            { value: this.contabilizarFoto(f), name: f.url, label: { show: false }, labelLine: { show: false } }
          );
          this.optionsLindas = {
            tooltip: {
              confine: true,
              trigger: 'item',
              formatter: '<div style="width: 9.5rem;"> {a}: {c} <br>  <img src="{b}" alt="foto"></div>',
            },
            calculable: true,
            series: [
              {
                name: 'Votos',
                type: 'pie',
                radius: [20, 90],
                roseType: 'radius',
                data: seriesLindas,
              },
            ],
          };
        });
        // console.log(this.pieChartDatasets[0].data);

        const xF: any[] = [];
        const yF: any[] = [];
        const series: any = [];
        this.fotosFeas.forEach(f => {
          if (f.votes.length > 0) {
            this.xF.push(f.url);
            //push(`<img src="{f.url}" alt="{f.id}" style="width: 100%;">`)
            series.push(
              { value: this.contabilizarFoto(f), name: f.url }
            );
            yF.push(this.contabilizarFoto(f))
          }
        });
        this.optionsFeas = {
          color: ['#3398DB'],
          tooltip: {
            confine: true,
            trigger: 'item',
            formatter: '<div style="width: 9.5rem;"> {a}: {c} <br>  <img src="{b}" alt="foto"></div>',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: xF,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',

            },

          ],
          series: [
            {
              name: 'Votos',
              type: 'bar',
              barWidth: '60%',
              data: series,
            },
          ],
        };
        // console.log(this.pieChartDatasets[0].data);


      });

  }


  contabilizarFoto(photo: Foto) {
    return photo.votes.length;
  }


  // onChartInit(e: ECharts) {
  //   this.chartInstance = e;
  //   console.log('on chart init:', e);
  // }


}
