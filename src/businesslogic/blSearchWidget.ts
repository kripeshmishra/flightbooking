export const blDestinationGetByName = async (value: any, type: number, setOriginLocations: any, setDestinationLocations: any) => {
    //type 1 = Orgin locations, 2 = Destination locations
    const url = `/api/airports?q=${value}`;
    try {
        if (value.length >= 2 || !value) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            if (data?.isSuccess) {
                if (type == 1) {
                    setOriginLocations(data.model);
                }
                else if (type == 2) {
                    setDestinationLocations(data.model);
                }
            }
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}


// export const blGetSearchResult = async (formData: any, setModel: any) => {

//     try {
//         const response = await fetch(`${process.env.api_path}/search`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });
//         console.log('response--', response)
//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('data--', data)
//         setModel(data.ListContract)

//     } catch (error) {
//         console.error(`Error fetching data: ${error}`);
//     }
// }


export const blGetFilterResult = async (setModel: any) => {
    try {
        const response = await fetch(`/api/search`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data?.IsSearchComplete) {
            setModel(data);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

export const blGetSearchResult = async (setContractsList: any, setIsLoading: any, setisMoreResult: any, page: number,) => {
    try {
        const response = await fetch(`/api/search?p=${page}`)
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data?.IsSearchComplete) {
            if (data?.ListContract?.length > 0) {
                if (data?.ListContract?.length < 10) {
                    setisMoreResult(false)
                } else {
                    setisMoreResult(true)
                    setContractsList((prev: any) => [...prev, ...data?.ListContract]);
                }
            } else {
                setisMoreResult(false)
            }
        }
        setIsLoading(false);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}