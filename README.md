# tbUS
Exploring tuberculosis trends in the U.S. over the years through machine learning.

#### Project 3: Columbia School of Engineering Data Analytics Bootcamp
Authors: Daniel Kenet, Jennifer Kim, Kat McEldowney, and Michelle Minkowitz (aka. Team Uber Colossal)

Date: April 22, 2024

### Introduction
Tuberculosis (TB) is an airborne infectious disease caused by *Mycobacterium tuberculosis*. Despite advancements in treatment and prevention programs, tuberculosis (TB) remains a serious global concern. This is particularly challenging in developing countries with limited laboratory facilities. According to the World Health Organization, about 1.5 million people die from the disease every year, making TB the world’s top infectious killer.

In the United States specifically, the Centers for Disease Control and Prevention (CDC) started a national surveillancce system for TB cases in 1953. The introduction of antimicrobial therapy led to a decrease in the incidence rate from 53 to 9.3 cases per 100,000 persons between 1953 and 1985. However, in the late 1980s, the rate increased, reaching a peak of 10.5 cases per 100,000 persons in 1992, which correlated with the onset of the acquired immunodeficiency syndrome (AIDS) epidemic. 

When concerns about AIDS and TB were recognized in the early 1990s, the government increased federal funding and implemented stronger TB control efforts. Due to these interventions, the rate went down to 5.8 per 100,000 persons in 2000. The rate had reached a steady level at about 3.0 per 100,000 persons from 2013 up until 2019.

Due to the Novel Coronavirus that began to spread in the U.S. at the beginning of 2020, clinics and healthcare facilities had to shut down and steer their resources to COVID. The disruptions in healthcare services, coupled with delayed diagnosis and reduced access to care due to lockdown measures, have contributed to the challenges faced in TB control during the COVID-19 pandemic.

There was a significant drop in TB cases reported from 2019 to 2020. After this sharp decline, TB cases rose in 2021 and 2022, but remain lower compared with 2019. At present, TB cases appear to be returning to pre-pandemic levels. However, the pandemic's impact on TB control has yet to be thoroughly explored.

We wanted to gauge the effect of COVID on TB by creating a time-series linear regression model that is trained on TB surveillance data before 2019 and predicts the number of TB cases during 2020-2022 if COVID had not interrupted TB services.

### Methods
The main aim of this project was to create a model that predicts the number of TB cases and rates following 2019 if COVID had not happened. 

#### Data Sources

The tuberculosis surveillance data from 2000-2022 were provided by the [CDC](https://www.cdc.gov/nchhstp/atlas/index.htm).

We mapped the TB cases and rates by year and state in JavaScript--please visit our [webpage](deployed page) to explore the U.S. TB surveillance data.

#### Definitions

According to the CDC, a tuberculosis case is counted as a Confirmed Case if the patient meets the clinical case definition (as determined by a medical provider) or is laboratory confirmed (positive for TB on culture or Nucleic Acid Amplification Test).

Rate is defined as the number of the event (TB cases) per 100,000 persons.

#### Modeling

### Results

### Limitations and Implications
