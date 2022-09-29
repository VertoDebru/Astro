import React from "react";

export default class Years extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // YEARS
            arrayYears: []
        }
    }

    componentDidMount() {
        this.getYears();
    }

    getYears() {
        // Start Loader
        this.setState({isLoading: true});

        let listYears = [];
        Object.entries(this.props.dataYears).forEach((year) => {
            listYears.push(year[1].year);
        });
        this.setState({ arrayYears: listYears, isLoading: false });
    }

    render() {
        const { arrayYears } = this.state;
        return (
            <select name="Y" className="years">
                {arrayYears.map((year,index) => (
                    <option key={index} value={new Date(year).getFullYear()}>{new Date(year).getFullYear()}</option>
                ))}
            </select>
        );
    }
}
