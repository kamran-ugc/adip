import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements AfterViewInit, OnChanges {
  @Input() title: string = 'FUNDS TO REACH YOUR GOAL';
  @Input() data: { name: string; value: number; color: string }[] = [];

  // New customizable inputs
  @Input() cutout: string = '70%';
  @Input() borderRadius: number = 30;
  @Input() borderWidth: number = 10;
  @Input() borderColor: string = '#f6f9fc';
  @Input() showTooltip: boolean = false;
  @Input() width: string = '100%';
  @Input() height: string = '100%';

  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef;
  private chartInstance!: Chart;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateChart();
    }
  }

  private initChart(): void {
    if (!this.pieChartCanvas) return;

    const centerPlugin = {
      id: 'centerCircle',
      afterDraw: (chart: any) => {
        const ctx = chart.ctx;
        const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
        const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
        const radius = 19.5; // Half of 39px height

        // Draw the circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#F6F8FA';
        ctx.fill();
        ctx.strokeStyle = '#EEF2F6';
        ctx.lineWidth = 1.116;
        ctx.stroke();
        ctx.restore();
      }
    };

    const backgroundPlugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart: any) => {
        const { ctx } = chart;
        const centerX = chart.width / 2;
        const centerY = chart.height / 2;
        const radius = Math.min(chart.width, chart.height) / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#F6F8FA';
        ctx.fill();
        ctx.restore();
      },
    };

    this.chartInstance = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.data.map((item) => item.name),
        datasets: [
          {
            data: this.data.map((item) => item.value),
            backgroundColor: this.data.map((item) => item.color),
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
            borderRadius: this.borderRadius,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: this.cutout,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: this.showTooltip },
        },
      },
      plugins: [backgroundPlugin, centerPlugin],
    });
  }

  private updateChart(): void {
    if (this.chartInstance) {
      this.chartInstance.data.labels = this.data.map((item) => item.name);
      this.chartInstance.data.datasets[0].data = this.data.map(
        (item) => item.value
      );
      this.chartInstance.data.datasets[0].backgroundColor = this.data.map(
        (item) => item.color
      );
      this.chartInstance.update();
    }
  }
}
