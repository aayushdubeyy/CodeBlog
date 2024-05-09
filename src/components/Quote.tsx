const Quote = () => {
  return (
    <div className="bg-slate-100 h-screen flex justify-center items-center flex-col">
      <div className="mx-10">
        <div className="max-w-xl w-full text-3xl font-bold">
          "The customer service I recieved was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="max-w-lg flex flex-col w-full mt-3">
          <div className=" font-[750]">Komal Sharma</div>
          <div className="font-normal text-slate-500">Chartered accountant</div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
