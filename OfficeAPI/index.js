const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

///////////////////////////////////

app.get('/', async (req , res) => {
    try{
        res.json("WELCOME TO OFFICE DATABASE");
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/jobHistory', async (req , res) => {
    try{
        const result = await pool.query(`select 
                                             e.employee_id,
                                             e.first_name,
                                             e.last_name,
                                             jh.job_id as "History JOB ID", 
                                             jh.start_date,
                                             jh.end_date,
                                             c.*,
                                             j.job_id,
                                             j.job_title
                                             from employees e
                                             inner join departments d on e.department_id = d.department_id
                                             inner join locations l on d.location_id = l.location_id
                                             inner join countries c on l.country_id = c.country_id
                                             inner join job_history jh on e.employee_id = jh.employee_id
                                             inner join jobs j on jh.job_id = j.job_id`);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/jobs', async (req , res) => {
    try{
        const result = await pool.query(`
                                    select * from jobs
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/numberOfEmployees', async (req , res) => {
    try{
        const result = await pool.query(`
                                    select count(employee_id) from employees
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});
app.get('/numberOfDepartments', async (req , res) => {
    try{
        const result = await pool.query(`
                                    select count(department_id) from departments
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/regionsCountriesLocations', async (req , res) => {
    try{
        const result = await pool.query(`
                                             select 
                                             r.region_id,
                                             r.region_name,
                                             c.country_id,
                                             c.country_name,
                                             l.location_id,
                                             l.city
                                             from regions r
                                             inner join countries c on c.region_id = r.region_id
                                             inner join locations l on c.country_id = l.country_id
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/countriesRegionsLocations', async (req , res) => {
    try{
        const result = await pool.query(`
                                            select
                                            c.*,
                                            r.region_name,
                                            l.location_id,
                                            l.city,
                                            l.country_id
                                            from countries c
                                            inner join regions r on c.region_id = r.region_id
                                            inner join locations l on c.country_id = l.country_id
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/locationsRegionsCountries', async (req , res) => {
    try{
        const result = await pool.query(`
                                         select
                                        
                                         c.*,
                                         r.region_name
                                        
                                         from locations l
                                        
                                         inner join countries c on l.country_id = c.country_id
                                         inner join regions r on c.region_id = r.region_id
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/departmentsEmployeesLocations', async (req , res) => {
    try{
        const result = await pool.query(`
                                        select
                                        
                                         d.department_id,
                                         d.department_name,
                                         e.employee_id,
                                         e.first_name,
                                         e.last_name,
                                         l.location_id,
                                         l.city
                                        
                                         from departments d
                                        
                                         inner join employees e on d.department_id = e.department_id
                                         inner join locations l on d.location_id = l.location_id
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/empDepLocCnt', async (req , res) => {
    try{
        const result = await pool.query(`
                                        select
                                        
                                        e.employee_id,
                                        e.first_name,
                                        e.last_name,
                                        d.department_id,
                                        d.department_name,
                                        l.location_id,
                                        l.city,
                                        c.country_id,
                                        c.country_name
                                        
                                        from employees e
                                        
                                        inner join departments d on e.department_id = d.department_id
                                        inner join locations l on d.location_id = l.location_id
                                        inner join countries c on l.country_id = c.country_id
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/empJobDepMngLoc', async (req , res) => {
    try{
        const result = await pool.query(`
                                        select
                                        
                                        e.employee_id as "Employee ID",
                                        e.first_name as "Emp First Name",
                                        e.last_name as "Emp Last Name",
                                        j.job_title,
                                        d.department_name,
                                        l.location_id,
                                        l.city,
                                        m.employee_id as "Manager ID",
                                        m.first_name as "Mng First Name",
                                        m.last_name as "Mng Last Name"
                                        
                                        from employees e
                                        
                                        inner join jobs j on e.job_id = j.job_id
                                        inner join departments d on e.department_id = d.department_id
                                        inner join locations l on d.location_id = l.location_id
                                        inner join employees m on e.manager_id = m.employee_id
                                             `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/countriesName', async (req , res) => {
    try{
        const result = await pool.query(`select country_name from countries where region_id = 1`);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/empCommissionPCT', async (req , res) => {
    try{
        const result = await pool.query(`select employee_id,first_name,last_name from employees where department_id in 
            (select department_id from departments where manager_id in (select employee_id from employees where commission_pct > 0.15)) 
            and commission_pct > 0.15`);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/managersJobTitle', async (req , res) => {
    try{
        const result = await pool.query(`select job_title from jobs where job_id in (select job_id from employees where manager_id is not null)`);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/postalcodes', async (req , res) => {
    try{
        const result = await pool.query(`select postal_code from locations where country_id in (select country_id from countries where region_id in (select region_id from regions where region_name like ('Asia')))`);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/employeeJobTitle', async (req , res) => {
    try{
        const result = await pool.query(`select job_title from jobs where job_id in (select job_id from employees where salary > (select avg(salary) from employees))`);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/employeeJobPosition', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            concat(e.first_name,' ',e.last_name) as full_name,
            count(j.employee_id) as job_count
            from employees e
            inner join job_history j on e.job_id = j.job_id
            group by e.employee_id,e.first_name,e.last_name
            having count(j.employee_id) > 1
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/employeeCount', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            d.department_name,
            count(d.department_id)
            from departments d
            inner join employees e on e.department_id = d.department_id
            group by d.department_id;
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/salaryJobTitle', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            j.job_title,
            sum(e.salary) as total_salary
            from jobs j
            inner join employees e on e.job_id = j.job_id
            group by job_title
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/salaryJobTitle', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            j.job_title,
            sum(e.salary) as total_salary
            from jobs j
            inner join employees e on e.job_id = j.job_id
            group by job_title
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/maxSalaryCountry', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            c.country_name,
            max(e.salary) as max_salary
            from employees e
            inner join departments d on e.department_id = d.department_id
            inner join locations l on d.location_id = l.location_id
            inner join countries c on l.country_id = c.country_id
            group by c.country_name
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/jobTitle1993_1997', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            concat(e.first_name,' ',e.last_name) as full_name,
            j.job_title,
            d.department_name,
            jh.start_date,
            jh.end_date
            from employees e
            inner join jobs j on e.job_id = j.job_id
            inner join departments d on e.department_id = d.department_id
            inner join job_history jh on e.employee_id = jh.employee_id
            group by e.first_name,e.last_name,j.job_title,d.department_name,jh.start_date,jh.end_date
            having jh.start_date >= '1993-01-01' and jh.end_date <= '1997-08-31'
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/twoEmployees', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            c.country_name,
            l.city,
            count(distinct d.department_id) as number_of_departments,
            count(e.employee_id) as number_of_employees
            from employees e
            inner join departments d on e.department_id = d.department_id
            inner join locations l on d.location_id = l.location_id
            inner join countries c on l.country_id = c.country_id
            group by c.country_name,l.city
            having count(e.employee_id) >= 2
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

app.get('/employeeName', async (req , res) => {
    try{
        const result = await pool.query(`
            select
            e.employee_id,
            e.first_name,
            e.last_name,
            j.job_title
            from employees e
            inner join jobs j on e.job_id = j.job_id
            inner join departments d on e.department_id = d.department_id
            inner join locations l on d.location_id = l.location_id
            where l.city = 'Toronto'
            `);
        res.json(result.rows);
    } catch (err){
        res.status(500).json({Error : err.message});
    }
});

//////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Connected SUCCESSFULLY......Running on PORT ${PORT}`);
})