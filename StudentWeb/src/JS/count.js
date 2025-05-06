const COUNT_API_LINK = "https://glowing-space-barnacle-69wxj7rqvvwrh4q94-5000.app.github.dev/numberOfEmployees";

fetch(JOB_API_LINK).then(response => {
    if (!response.ok)
        throw new Error("Failed to fetch data");
    return response.json();
}).then(data => {
    const box = document.querySelector("#box");
    console.log(box)
    data.forEach(box => {
        const boxs = document.createElement("div");
        boxs.innerHTML=`
            <td>${job.job_id}</td>
            <td>${job.job_title}</td>
            <td>${job.min_salary}</td>
            <td>${job.max_salary}</td>
        `;
        tbody.appendChild(row);
    })
})