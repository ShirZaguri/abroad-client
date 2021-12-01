export default class WeatherService {
    static async getWeather(
        location: string,
        time: string | number | Date,
    ): Promise<any> {
        try {
            const data = await fetch(
                `https://abroad-weather-api.herokuapp.com/api/weather/${location}/${time}`,
            );
            return await data.json();
        } catch (err) {
            throw new Error();
        }
    }
}
