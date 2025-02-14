"use client";

import { React, useState } from "react";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setStatus(
        <div className="flex bg-red-300 py-2 mb-4 text-red-900 rounded px-4 items-center">
          <FaCheck className="mr-2" />
          <span className="">
            Pro objednání je potřeba souhlasit se zpracováním osobních údajů.
          </span>
        </div>
      );
      return;
    } else {
      setIsSubmitting(true);

      try {
        const res = await fetch("/api/send-mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          }),
        });

        if (res.ok) {
          setStatus(
            <div className="flex bg-green-300 py-2 mb-4 text-green-900 rounded px-4 items-center">
              <FaCheck className="mr-2" />
              <span className="">Email byl úspěšně odeslán.</span>
            </div>
          );
          setFormData({
            name: "",
            surname: "",
            phone: "",
            email: "",
            message: "",
          });
          setIsChecked(false);
        } else {
          setStatus(
            <div className="flex bg-red-300 py-2 mb-4 text-red-900 rounded px-4 items-center">
              <span className="">
                Nastala chyba při zpracování formuláře. Zkuste to, prosím, znovu
                nebo kontaktujte mne pomocí telefonu nebo prostřednictvím emailu
              </span>
            </div>
          );
        }
      } catch (error) {
        console.error("Chyba při odesílání formuláře:", error);
        <div className="flex bg-red-300 py-2 mb-4 text-red-900 rounded px-4 items-center">
          <span className="">
            Nastala chyba při zpracování formuláře. Zkuste to, prosím, znovu
            nebo kontaktujte mne pomocí telefonu nebo prostřednictvím emailu
          </span>
        </div>;
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="block font-medium text-black"
    >
      {status && <p className="">{status}</p>}
      <h3 className="text-center">Kontaktní formulář</h3>

      <div className="xl:flex lg:block block justify-between xl:space-x-6 space-x-0 ">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg outline-none w-full mb-2 xl:mb-0 py-2 px-4 focus:border-gray-400 duration-200 transiton-all"
          placeholder="Jméno"
          autoCorrect="off"
          name="name"
          required
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg outline-none w-full py-2 px-4 focus:border-gray-400 duration-200 transiton-all"
          placeholder="Příjmení"
          autoCorrect="off"
          name="surname"
          required
          onChange={handleChange}
          value={formData.surname}
        />
      </div>

      <div className="block">
        <input
          type="email"
          className="border-2 border-gray-300 w-full rounded-lg outline-none px-4 py-2 my-2 focus:border-gray-400 duration-200  transiton-all"
          placeholder="E-mail"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="tel"
          className="border-2 border-gray-300 w-full rounded-lg outline-none px-4 py-2 my-2 focus:border-gray-400 duration-200  transiton-all"
          placeholder="Telefon"
          autoCorrect="off"
          name="phone"
          required
          onChange={handleChange}
          value={formData.phone}
        />
        <textarea
          className="border-2 border-gray-300 rounded-lg outline-none px-4 py-2 my-2 focus:border-gray-400 min-h-72 min-w-full transiton-all"
          id=""
          placeholder="Váš vzkaz"
          name="message"
          required
          onChange={handleChange}
          value={formData.message}
        ></textarea>
      </div>

      <div className="md:flex block items-center cursor-pointer mb-4">
        <input
          type="checkbox"
          name=""
          id="link-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-5 h-5 outline-none ring-offset-2 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 focus:ring-2"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 font-medium text-gray-900 dark:text-gray-600 cursor-pointer"
        >
          Zaškrtnutím souhlasíte se zpracováním vámi zadaných osobních údajů
        </label>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          value="Odeslat"
          disabled={!isChecked || isSubmitting}
          className={` px-16 py-3 font-semibold font-lgcursor-pointer text-black rounded border-2 border-gray-300 
          
          ${
            !isChecked || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          {isSubmitting ? "Odesílání..." : "Odeslat"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
