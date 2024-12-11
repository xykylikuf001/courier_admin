import {LanguagesChoices} from "@/openapi/client";

export const languages = [
    {value: LanguagesChoices.EN, label: "English"},
    {value: LanguagesChoices.RU, label: "Russian"},
    {value: LanguagesChoices.TK, label: "Turkmen"},
]

type LanguagesKeymapType = Record<string, { value: string, label: string }>

export const languagesKeymap: LanguagesKeymapType  = {
    "en": {value: LanguagesChoices.EN, label: "English"},
    "ru": {value: LanguagesChoices.RU, label: "Russian"},
    "tk": {value: LanguagesChoices.TK, label: "Turkmen"},
}
