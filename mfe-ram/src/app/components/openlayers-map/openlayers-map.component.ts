import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-openlayers-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container">
      <div class="map-header">
        <h4>🗺️ OpenLayers Map Integration Test</h4>
        <p>Testing map rendering in RAM standalone mode</p>
      </div>
      <div style="height: 400px; width: 100%; position: relative;">
        <div id="map" class="map-element" style="height: 100%; width: 100%;"></div>
      </div>
    </div>
  `,
  styles: [`
    .map-container {
      height: 100%;
      width: 100%;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }
    
    .map-header {
      background: #f5f5f5;
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
      flex-shrink: 0;
    }
    
    .map-header h4 {
      margin: 0 0 4px 0;
      color: #1976d2;
      font-size: 16px;
      font-weight: 500;
    }
    
    .map-header p {
      margin: 0;
      color: #666;
      font-size: 12px;
    }
    
    .map-element {
      width: 100%;
      height: 100%;
      min-height: 300px;
      background: #f8f9fa;
      position: relative;
      overflow: hidden;
    }
    
    /* OpenLayers controls styling */
    :host ::ng-deep .ol-control {
      background-color: rgba(255,255,255,0.8);
      border-radius: 4px;
    }
    
    :host ::ng-deep .ol-zoom {
      top: 8px;
      left: 8px;
    }
    
    :host ::ng-deep .ol-attribution {
      bottom: 8px;
      right: 8px;
    }
  `]
})
export class OpenlayersMapComponent implements AfterViewInit, OnDestroy {
  private map: Map | null = null;

  ngAfterViewInit(): void {
    console.log('🗺️ OpenLayers: Starting map initialization...');
    
    // Add small delay to ensure DOM is fully ready
    setTimeout(() => {
      this.initializeMap();
    }, 100);
  }

  private initializeMap(): void {
    console.log('🧭 Initializing OL map — checking map target...');
    
    const mapElement = document.getElementById('map');
    console.log('🧭 Map target element found:', mapElement);
    
    if (!mapElement) {
      console.error('❌ OpenLayers: Map target element #map not found!');
      return;
    }

    // DOM VALIDATION - Debug Checklist Item 1
    const width = mapElement.offsetWidth;
    const height = mapElement.offsetHeight;
    const computedStyle = window.getComputedStyle(mapElement);
    
    console.log('📏 DOM VALIDATION:');
    console.log(`   Width: ${width}px, Height: ${height}px`);
    console.log(`   Computed CSS: width=${computedStyle.width}, height=${computedStyle.height}`);
    console.log(`   Display: ${computedStyle.display}, Position: ${computedStyle.position}`);
    console.log(`   Visibility: ${computedStyle.visibility}, Overflow: ${computedStyle.overflow}`);
    
    if (width === 0 || height === 0) {
      console.error('❌ DOM VALIDATION FAILED: Map container has zero dimensions!');
      return;
    }

    try {
      console.log('🗺️ OpenLayers: Creating map instance...');
      
      // Create OSM source with debugging
      const osmSource = new OSM();
      osmSource.on('tileloadstart', (event) => {
        console.log('🌐 TILE REQUEST: Loading tile:', event.tile.getTileCoord());
      });
      osmSource.on('tileloadend', (event) => {
        console.log('✅ TILE SUCCESS: Loaded tile:', event.tile.getTileCoord());
      });
      osmSource.on('tileloaderror', (event) => {
        console.error('❌ TILE ERROR: Failed to load tile:', event.tile.getTileCoord());
      });
      
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: osmSource,
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]), // Center of the world
          zoom: 2,
        }),
      });
      
      console.log('✅ OpenLayers: Map initialized successfully');
      console.log('🗺️ Map viewport size:', this.map.getSize());
      console.log('🎯 Map view center:', this.map.getView().getCenter());
      console.log('🔍 Map view zoom:', this.map.getView().getZoom());
      
      // Enhanced debugging events
      this.map.once('rendercomplete', () => {
        console.log('🎨 OpenLayers: Initial render complete - tiles should be visible');
        console.log('📊 Map layers:', this.map?.getLayers().getLength());
        console.log('🖼️ Map layers collection:', this.map?.getLayers());
      });

      this.map.getView().on('change:center', () => {
        console.log('🗺️ OpenLayers: Map center changed to:', this.map?.getView().getCenter());
      });

      this.map.getView().on('change:resolution', () => {
        console.log('🗺️ OpenLayers: Map zoom changed to:', this.map?.getView().getZoom());
      });

      // Force initial render with multiple attempts
      setTimeout(() => {
        this.map?.updateSize();
        console.log('🔄 OpenLayers: Forced map size update (200ms)');
      }, 200);
      
      // Additional size update for stubborn Material containers
      setTimeout(() => {
        this.map?.updateSize();
        console.log('✅ OpenLayers: Final map size update (500ms)');
        if (this.map) {
          console.log('🗺️ Final map size:', this.map.getSize());
        }
      }, 500);
      
    } catch (error) {
      console.error('❌ OpenLayers: Failed to initialize map:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      console.log('🧹 OpenLayers: Cleaning up map instance');
      this.map.setTarget(undefined);
      this.map = null;
    }
  }
}