class ThemeManager {
    constructor() {
        this.state = {
            isAutoSeasonOn: true, // Controls automatic seasonal changes
            currentTheme: 'light', // Stores the current light/dark mode
            currentSeasonIndex: 0, // Index to track seasonal themes
            seasons: ['spring', 'summer', 'autumn', 'winter', 'timeless'], // Include timeless as a season
        };

        // Cache DOM elements for buttons
        this.toggleLightDarkBtn = document.getElementById('toggleLightDark');
        this.cycleSeasonBtn = document.getElementById('cycleSeason');
        this.toggleSeasonAutoBtn = document.getElementById('toggleSeasonAuto');

        // Initialize event listeners
        this.initializeListeners();

        // Apply the initial theme based on the user's settings or defaults
        this.initializeTheme();
    }

    // Utility function to apply the selected theme
    applyTheme(season, theme) {
        const themeClasses = [
            'spring-light-theme', 'spring-dark-theme', 
            'summer-light-theme', 'summer-dark-theme', 
            'autumn-light-theme', 'autumn-dark-theme', 
            'winter-light-theme', 'winter-dark-theme',
            'timeless-light-theme', 'timeless-dark-theme'
        ];

        // Remove any previously applied theme
        document.documentElement.classList.remove(...themeClasses);

        // Apply the new theme based on the season and light/dark mode
        document.documentElement.classList.add(`${season}-${theme}-theme`);
    }

    // Get the current time-based theme (light or dark)
    getTimeBasedTheme() {
        const hours = new Date().getHours();
        return (hours >= 7 && hours <= 19) ? 'light' : 'dark'; // Return either 'light' or 'dark'
    }

    // Get the current seasonal theme based on the month
    getSeasonBasedTheme() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring'; // March to May
        if (month >= 5 && month <= 7) return 'summer'; // June to August
        if (month >= 8 && month <= 10) return 'autumn'; // September to November
        if (month >= 11 || month <= 1) return 'winter'; // December to February
        return 'timeless'; // Timeless as a fallback or default
    }

    // Apply automatic theme based on time and season
    applyAutomaticTheme() {
        if (this.state.isAutoSeasonOn) {
            const timeTheme = this.getTimeBasedTheme();
            const seasonTheme = this.getSeasonBasedTheme();
            this.state.currentTheme = timeTheme;
            this.applyTheme(seasonTheme, timeTheme); // Use the new naming convention
            this.saveThemeToLocalStorage(seasonTheme, timeTheme);
        }
    }

    // Cycle through seasonal themes manually, including timeless
    cycleSeason() {
        this.state.currentSeasonIndex = (this.state.currentSeasonIndex + 1) % this.state.seasons.length;
        const selectedSeason = this.state.seasons[this.state.currentSeasonIndex];
        this.applyTheme(selectedSeason, this.state.currentTheme);
        this.cycleSeasonBtn.textContent = `Nåværende sesong: ${selectedSeason}`;
        this.saveSeasonToLocalStorage(selectedSeason);
    }

    // Toggle between light and dark themes
    toggleLightDarkTheme() {
        this.state.currentTheme = (this.state.currentTheme === 'light') ? 'dark' : 'light';
        const selectedSeason = this.state.seasons[this.state.currentSeasonIndex];
        this.applyTheme(selectedSeason, this.state.currentTheme);
        this.saveTimeThemeToLocalStorage(this.state.currentTheme);
    }

    // Toggle automatic seasonal changes
    toggleAutoSeason() {
        this.state.isAutoSeasonOn = !this.state.isAutoSeasonOn;
        this.toggleSeasonAutoBtn.textContent = this.state.isAutoSeasonOn
            ? 'Automatiske sesongendringer: På'
            : 'Automatiske sesongendringer: Av';

        if (this.state.isAutoSeasonOn) {
            this.applyAutomaticTheme();
        } else {
            localStorage.removeItem('selectedTheme');
        }
    }

    // Initialize the theme on page load based on previous settings
    initializeTheme() {
        const savedSeason = this.getSeasonFromLocalStorage() || this.getSeasonBasedTheme();
        const savedTimeTheme = this.getTimeThemeFromLocalStorage() || this.getTimeBasedTheme();
        this.state.currentTheme = savedTimeTheme;
        this.state.currentSeasonIndex = this.state.seasons.indexOf(savedSeason);
        this.applyTheme(savedSeason, this.state.currentTheme);
        this.cycleSeasonBtn.textContent = `Nåværende sesong: ${savedSeason}`;
    }

    // Initialize event listeners
    initializeListeners() {
        this.toggleLightDarkBtn.addEventListener('click', () => this.toggleLightDarkTheme());
        this.cycleSeasonBtn.addEventListener('click', () => this.cycleSeason());
        this.toggleSeasonAutoBtn.addEventListener('click', () => this.toggleAutoSeason());
    }

    // Save theme to localStorage
    saveThemeToLocalStorage(season, theme) {
        localStorage.setItem('selectedTheme', `${season}-${theme}-theme`);
    }

    // Save season to localStorage
    saveSeasonToLocalStorage(season) {
        localStorage.setItem('selectedSeason', season);
    }

    // Save time theme (light/dark) to localStorage
    saveTimeThemeToLocalStorage(timeTheme) {
        localStorage.setItem('timeTheme', timeTheme);
    }

    // Retrieve saved season from localStorage
    getSeasonFromLocalStorage() {
        return localStorage.getItem('selectedSeason');
    }

    // Retrieve saved time theme from localStorage
    getTimeThemeFromLocalStorage() {
        return localStorage.getItem('timeTheme');
    }
}

// Initialize the ThemeManager when the document content is loaded
document.addEventListener('DOMContentLoaded', () => new ThemeManager());
