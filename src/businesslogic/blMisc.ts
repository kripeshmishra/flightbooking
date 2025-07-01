export const blGetCountryList = async (setCountryList: any) => {
    try {
        const response = await fetch(`/api/countries`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data?.isSuccess) {
            setCountryList(data.model);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};


export const blGetStateList = async (setStateList: any) => {
    try {
        const response = await fetch(`/api/states`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data?.isSuccess) {
            setStateList(data.model);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};
