function Resume() {
  return (
    <div className="prose dark:prose-invert  flex flex-col gap-20 pt-12 w-[900px] m-auto">
      <section className="flex flex-col">
        <h1 className="mb-4">Geonsang Jo</h1>
        <h2 className="mt-0">Front Engineer</h2>
        <p className="m-0">
          A web front-end developer with a strong interest in business.
        </p>
        <p className="m-0">
          Passionate about developer productivity and proposing ideas to the
          team.
        </p>
      </section>
      <section className="flex flex-col">
        <h1>Exprience</h1>
        <ul className="list-none p-0">
          <li className="flex p-0  gap-4">
            <div className="relative flex-[3_1_0%] pr-4">
              <div className="sticky top-[80px]">
                <h3 className="mt-0">WantedLab.</h3>
                <h4 className="mt-0">2022.02 ~</h4>
                <h4 className="mt-0">Front Engineer</h4>
                <p>
                  Managed the Wanted/Wanted-Insight project, focusing on SEO
                  setup and performance enhancement.
                </p>
              </div>
            </div>
            <div className="relative flex-[7_1_0%]">
              <div>
                <h3>Wanted-Insight</h3>
                <h4>2022.02 ~</h4>
                <p></p>
              </div>
              <div className="h-96">Wanted-Insight</div>
              <div className="h-96">Wanted Tech</div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Resume;
