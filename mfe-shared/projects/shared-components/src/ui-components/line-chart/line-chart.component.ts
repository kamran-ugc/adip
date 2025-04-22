import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../chips/chip.component';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  imports: [CommonModule, ChipComponent],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  @Input() datasets: { label: string; labels: string[]; data: number[] }[] = [
    {
      label: '1W',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      data: [120, 200, 170, 300, 400],
    },
    {
      label: '3W',
      labels: ['W1', 'W2', 'W3'],
      data: [400, 500, 600],
    },
    {
      label: '1M',
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [100, 200, 300, 450],
    },
    {
      label: '2M',
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
      data: [80, 150, 170, 250, 300, 350, 400, 500],
    },
  ];
  @Input() color: string = '#1f8efa';
  @Input() showTooltip: boolean = true;
  @Input() width: string = '100%';
  @Input() height: string = '100%';

  selectedRange: string = '1W';
  chart!: Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  onRangeSelect(range: string): void {
    this.selectedRange = range;
    this.renderChart();
  }

  get activeData() {
    return this.datasets.find((d) => d.label === this.selectedRange);
  }

  renderChart(): void {
    if (!this.chartCanvas || !this.activeData) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (this.chart) this.chart.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, this.color + '33');
    gradient.addColorStop(1, this.color + '00');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.activeData.labels,
        datasets: [
          {
            data: this.activeData.data,
            borderColor: this.color,
            backgroundColor: 'transparent',
            fill: true,
            tension: 0.5,
            pointRadius: 5,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff', // hollow center
            pointBorderColor: this.color,
            pointBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: this.showTooltip,
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            titleColor: '#6b7280',
            titleFont: { size: 10, weight: 'normal' },
            bodyColor: '#16a34a',
            bodyFont: { size: 13, weight: 'bold' },
            padding: 10,
            callbacks: {
              title: () => 'July 23, 2020',
              label: (ctx) => `+$${ctx.raw} (1.23%)`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: '#f0f3f8',
              lineWidth: 1,
              ...({ borderDash: [4, 4] } as any),
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#f0f3f8',
              lineWidth: 1,
              ...({ borderDash: [4, 4] } as any),
            },
          },
        },
      },
    });
  }
}
