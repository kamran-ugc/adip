import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-openlayers-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="debug-container">
      <h4>🧪 OpenLayers Static Fallback Test</h4>
      <p>Simplified initialization for debugging</p>
      <!-- Static dimensions with background for visibility -->
      <div id="debug-map" style="width: 800px; height: 600px; background: #ccc; border: 3px solid red;"></div>
      <div class="debug-info">
        <p><strong>Expected:</strong> World map centered at [0,0] with zoom level 2</p>
        <p><strong>Fallback:</strong> Gray background with red border if tiles fail</p>
      </div>
    </div>
  `,
  styles: [`
    .debug-container {
      padding: 20px;
      background: #f0f0f0;
      border: 2px dashed #333;
      margin: 20px 0;
    }
    
    .debug-info {
      margin-top: 10px;
      font-size: 12px;
      color: #666;
    }
    
    #debug-map {
      margin: 10px 0;
    }
    
    /* Ensure OpenLayers styles apply */
    :host ::ng-deep .ol-control {
      background-color: rgba(255,255,255,0.9);
      border-radius: 4px;
    }
  `]
})
export class OpenlayersDebugComponent implements AfterViewInit, OnDestroy {
  private debugMap: Map | null = null;

  ngAfterViewInit(): void {
    console.log('🧪 DEBUG: Starting static fallback test...');
    
    setTimeout(() => {
      const debugElement = document.getElementById('debug-map');
      console.log('🧪 DEBUG: Map element found:', debugElement);
      console.log('🧪 DEBUG: Element dimensions:', debugElement?.offsetWidth, 'x', debugElement?.offsetHeight);
      
      if (!debugElement) {
        console.error('🧪 DEBUG: FAILED - No debug-map element found');
        return;
      }

      try {
        console.log('🧪 DEBUG: Creating simplified map...');
        
        this.debugMap = new Map({
          target: 'debug-map',
          layers: [
            new TileLayer({ 
              source: new OSM() 
            }),
          ],
          view: new View({
            center: fromLonLat([0, 0]),
            zoom: 2,
          }),
        });
        
        console.log('🧪 DEBUG: Map created successfully');
        console.log('🧪 DEBUG: Map size:', this.debugMap.getSize());
        
        this.debugMap.once('rendercomplete', () => {
          console.log('🧪 DEBUG: ✅ RENDER COMPLETE - Tiles should be visible!');
        });
        
      } catch (error) {
        console.error('🧪 DEBUG: FAILED to create map:', error);
      }
    }, 150);
  }

  ngOnDestroy(): void {
    if (this.debugMap) {
      this.debugMap.setTarget(undefined);
      this.debugMap = null;
    }
  }
}