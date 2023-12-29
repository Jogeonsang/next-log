import { resumeInfo } from "~metadata/resume";

function ResumeExprience() {
  return (
    <section className="flex flex-col">
      <h1>Exprience</h1>
      {resumeInfo.experience.map((exp, index) => (
        <ul className="list-none p-0" key={index}>
          <li className="flex p-0  gap-4">
            <div className="relative flex-[3_1_0%] pr-4">
              <div className="sticky top-[80px]">
                <h3 className="mt-0">{exp.company}</h3>
                <h4 className="mt-0">{exp.period}</h4>
                <h4 className="mt-0">{exp.position}</h4>
                <p>{exp.summary}</p>
              </div>
            </div>
            <div className="relative flex-[7_1_0%]">
              {exp.projects.map((project, projIndex) => (
                <div key={projIndex} className="mb-8">
                  <h4 className="m-0">{project.name}</h4>
                  <p>{project.duration}</p>
                  <p
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                  <ul className="m-0 p-0">
                    {project.responsibilities?.map(
                      (responsibility, respIndex) => (
                        <li key={respIndex} className="ml-4">
                          {responsibility}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        </ul>
      ))}
    </section>
  );
}

export default ResumeExprience;
