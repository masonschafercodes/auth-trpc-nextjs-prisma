export async function getClearbitDataByCompanyName(comanyName: string, apiKey: string) {
    // need to get the company domain via name
    const response = await fetch(`https://company.clearbit.com/v1/domains/find?name=${comanyName}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (response.status !== 200) {
        return {
            status: response.status,
            message: "Error retrieving data from Clearbit",
            result: {},
        }
    } else {
        const data = await response.json();


        if (data.domain) {
            const res = await fetch(`https://company.clearbit.com/v2/companies/find?domain=${data.domain}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }
            });

            if (res.status !== 200) {
                return {
                    status: res.status,
                    message: "Error retrieving data from Clearbit",
                    result: {},
                }
            }

            const clearData = await res.json();

            return {
                status: 200,
                message: "Data successfully retrieved",
                result: clearData,
            }
        }
    }

    return {
        status: 200,
        message: "Data successfully retrieved",
        result: {},
    }
}