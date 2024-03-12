import React from "react";

export const Card = (props) => {
  console.log(props);
  return (
    <div className="min-w-40 w-fit px-3 h-fit bg-slate-50 rounded-xl m-auto ">
      <h1 className="  text-gray-800 mt-4  text-[1.5rem] font-bold">
        {props.data.name}
      </h1>
      <p className=" font-semibold">{props.data.description}</p>
      <h2 className=" mt-1 font-normal font-medium ">Interests</h2>
      <ul className="  flex gap-1">
        {props.data.Interests.map((Interest) => {
          return <li className="font-extralight">{Interest}</li>;
        })}
      </ul>
      <div className="flex w-fit h-fit mt-4 gap-3  mb-3">
        {props.data.SocialMedia.map((Social) => {
          return (
            <a className="bg-violet-700 px-8 py-2 rounded-lg" href="">
              {Social}
            </a>
          );
        })}
      </div>
    </div>
  );
};
