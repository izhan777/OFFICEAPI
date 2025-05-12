const NUMBERS_API_LINK = "https://glowing-space-barnacle-69wxj7rqvvwrh4q94-5000.app.github.dev/totalNumbers";

fetch(NUMBERS_API_LINK).then(res => {
    if (!res.ok)
        throw new Error("Failed to fetch data");
    return res.json();
}).then(data => {
    document.getElementById('employees').innerText = `Number of Employees : ${data.employees}`;
    document.getElementById('deparments').innerText = `Number of Deparments : ${data.departments}`;
    document.getElementById('jobs').innerText = `Number of Jobs : ${data.jobs}`;
    document.getElementById('jobHistory').innerText = `Number of Job History : ${data.jobHistory}`;
    document.getElementById('locations').innerText = `Number of Locations : ${data.locations}`;
    document.getElementById('countries').innerText = `Number of Countries : ${data.countries}`;
    document.getElementById('regions').innerText = `Number of Regions : ${data.regions}`;
})