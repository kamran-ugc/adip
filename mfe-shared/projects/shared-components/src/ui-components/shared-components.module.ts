import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './custom-button/button.component';
import { CustomInputComponent } from './input/custom-input.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox-circle/checkbox.component';
import { ChipComponent } from './chips/chip.component';
import { CircularLoaderComponent } from './circular-progress/circular-loader.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressBarComponent } from './linear-progress/linear-progress.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal-revamp/modal.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { StepProgressBarComponent } from './step-progress/progress-bar.component';
import { TabSelectionComponent } from './tab-selection/tab-selection.component';
import { TagComponent } from './tag/tag.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { IconComponent } from './icon/icon.component';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { RadioGroupComponent } from './radio-button/radio-group.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ToggleComponent } from '../public-api';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MultiTabComponent } from './multi-tab/multi-tab.component';
import { RangeMeterComponent } from './range-meter/range-meter.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonComponent,
    CustomInputComponent,
    CalendarComponent,
    CardComponent,
    CheckboxComponent,
    ChipComponent,
    CircularLoaderComponent,
    FileUploadComponent,
    ProgressBarComponent,
    LoaderComponent,
    ModalComponent,
    RadioButtonComponent,
    StepProgressBarComponent,
    TabSelectionComponent,
    TagComponent,
    TooltipComponent,
    IconComponent,
    DropdownComponent,
    PhoneInputComponent,
    RadioGroupComponent,
    ToggleComponent,
    NotificationBannerComponent,
    PieChartComponent,
    LineChartComponent,
    MultiTabComponent,
    RangeMeterComponent,
  ],
  exports: [
    ButtonComponent,
    CustomInputComponent,
    CalendarComponent,
    CardComponent,
    CheckboxComponent,
    ChipComponent,
    CircularLoaderComponent,
    FileUploadComponent,
    ProgressBarComponent,
    LoaderComponent,
    ModalComponent,
    RadioButtonComponent,
    StepProgressBarComponent,
    TabSelectionComponent,
    TagComponent,
    TooltipComponent,
    IconComponent,
    DropdownComponent,
    PhoneInputComponent,
    RadioGroupComponent,
    ToggleComponent,
    NotificationBannerComponent,
    PieChartComponent,
    LineChartComponent,
    MultiTabComponent,
    RangeMeterComponent,
  ],
})
export class SharedComponentsModule {}
