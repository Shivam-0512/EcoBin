// UI Enhancement Functions

// Apply sidebar enhancements
function enhanceSidebar() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.bg-swachh-800 nav a');
    
    sidebarLinks.forEach(link => {
        // Add sidebar-link class to all links
        link.classList.add('sidebar-link');
        
        // Find icons in links and add sidebar-icon class
        const icon = link.querySelector('i');
        if (icon) icon.classList.add('sidebar-icon');
        
        // Mark current page as active
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Apply card enhancements
// Apply card enhancements
function enhanceCards() {
    // Add card class to all card-like elements
    const cards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md');
    cards.forEach(card => {
        card.classList.add('card');
    });
    
    // Add status indicators
    const statusElements = document.querySelectorAll('[class*="bg-red-"], [class*="bg-green-"]');
    statusElements.forEach(element => {
        // Check if element already has a status indicator
        if (element.querySelector('.status-indicator')) {
            return; // Skip if already has an indicator
        }
        
        if (element.textContent.toLowerCase().includes('full')) {
            const indicator = document.createElement('span');
            indicator.classList.add('status-indicator', 'status-full');
            element.prepend(indicator);
        } else if (element.textContent.toLowerCase().includes('empty')) {
            const indicator = document.createElement('span');
            indicator.classList.add('status-indicator', 'status-empty');
            element.prepend(indicator);
        }
    });
}

// Enhance map markers
// Enhance map markers
function enhanceMapMarkers(map) {
    if (!map || !window.L) return;
    
    // Override the default marker style
    const originalAddBinToMap = window.addBinToMap;
    if (originalAddBinToMap) {
        window.addBinToMap = function(bin) {
            // Use the original function if it exists and works
            try {
                return originalAddBinToMap(bin);
            } catch (error) {
                console.log("Using enhanced marker fallback");
                // Fallback to our enhanced version
                const color = bin.status === 'full' ? '#E74C3C' : '#27AE60';
                
                // Create marker with enhanced styling
                const marker = L.circleMarker([bin.lat, bin.lng], {
                    radius: 8,
                    fillColor: color,
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                });
                
                // Add to map if available
                if (window.map) {
                    marker.addTo(window.map);
                }
                
                // Add enhanced popup
                marker.bindPopup(`
                    <div style="padding: 10px; max-width: 250px; font-family: 'Arial', sans-serif;">
                        <h3 style="font-weight: bold; margin-bottom: 10px; color: #16A085; border-bottom: 2px solid #16A085; padding-bottom: 5px;">Bin ${bin.id}</h3>
                        <p style="margin: 8px 0; display: flex; align-items: center;">
                            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 8px;"></span>
                            <span style="font-weight: 500;">Status:</span> 
                            <span style="margin-left: 5px; color: ${color};">${bin.status}</span>
                        </p>
                        <p style="margin: 8px 0;">
                            <span style="font-weight: 500;">Fill Level:</span> 
                            <span style="margin-left: 5px;">${bin.fillLevel || 0}%</span>
                        </p>
                        <p style="margin: 8px 0;">
                            <span style="font-weight: 500;">Coordinates:</span> 
                            <span style="margin-left: 5px; font-size: 0.9em; color: #636E72;">${bin.lat.toFixed(4)}, ${bin.lng.toFixed(4)}</span>
                        </p>
                    </div>
                `);
                
                // Store marker reference if markers object exists
                if (window.markers) {
                    window.markers[bin.id] = marker;
                }
                
                return marker;
            }
        };
    }
}

// Enhance charts
function enhanceCharts() {
    if (!window.Chart) return;
    
    // Set global Chart.js defaults
    Chart.defaults.font.family = "'Arial', sans-serif";
    Chart.defaults.color = '#636E72';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(30, 39, 46, 0.8)';
    Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
    Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
    Chart.defaults.plugins.tooltip.borderColor = '#16A085';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 6;
    
    // Custom gradient for charts
    const createGradient = (ctx, colorStart, colorEnd) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    };
    
    // Apply to existing charts
    const updateChartStyles = () => {
        if (!Chart.instances) return;
        
        Chart.instances.forEach(chart => {
            if (chart.config.type === 'line') {
                chart.data.datasets.forEach(dataset => {
                    const ctx = chart.ctx;
                    dataset.backgroundColor = createGradient(ctx, 'rgba(22, 160, 133, 0.2)', 'rgba(22, 160, 133, 0)');
                    dataset.borderColor = '#16A085';
                    dataset.pointBackgroundColor = '#ffffff';
                    dataset.pointBorderColor = '#16A085';
                    dataset.pointHoverBackgroundColor = '#16A085';
                    dataset.pointHoverBorderColor = '#ffffff';
                    dataset.pointHoverRadius = 6;
                    dataset.pointHoverBorderWidth = 2;
                });
            } else if (chart.config.type === 'bar') {
                chart.data.datasets.forEach(dataset => {
                    const ctx = chart.ctx;
                    dataset.backgroundColor = createGradient(ctx, '#16A085', '#0B5345');
                    dataset.hoverBackgroundColor = '#F39C12';
                });
            }
            chart.update();
        });
    };
    
    // Call this after charts are initialized
    setTimeout(updateChartStyles, 100);
}

// Apply all enhancements
function applyUIEnhancements() {
    enhanceSidebar();
    enhanceCards();
    
    // For maps, we need to wait until the map is initialized
    if (window.map) {
        enhanceMapMarkers(window.map);
    }
    
    // For charts, we need to wait until charts are initialized
    if (window.Chart) {
        enhanceCharts();
    }
}

// Run enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply initial enhancements
    applyUIEnhancements();
    
    // Apply enhancements again after a delay to catch dynamically created elements
    setTimeout(applyUIEnhancements, 1000);
});