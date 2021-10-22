class colorPicker {
    constructor() {
        this.colors = [
            '#abcfe7',
            '#1DD3B0',
            '#AFFC41',
            '#B2FF9E',
            '#FFA737',
            '#F5FF90',
            '#D6FFB7',
            '#E2AEDD',
            '#B47978',
            '#81D2C7',
            '#9FFFCB'
        ]                     
    }

    getRandomColor = () => {        
        let max = this.colors.length - 1;
        const min = 0;
        return this.colors[Math.floor(Math.random() * (max - min + 1) ) + min];
    }
}

export default colorPicker;