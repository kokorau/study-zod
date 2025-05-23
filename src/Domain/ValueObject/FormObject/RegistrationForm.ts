import { z } from "zod";
import type { Result } from "../Result/Result";
import { success, failure } from "../Result/Result";
import type { ValidationError } from "../Error/ValidationError";
import type { ExtractFormDataType } from "../FormField/FormFieldFactory";
import { type NameField, $NameField } from "../FormField/NameField";
import { type EmailField, $EmailField } from "../FormField/EmailField";
import { type PasswordField, $PasswordField } from "../FormField/PasswordField";
import { type AgeField, $AgeField } from "../FormField/AgeField";
import { type GenderField, $GenderField } from "../FormField/GenderField";
import { type CountryField, $CountryField } from "../FormField/CountryField";
import { type BioField, $BioField } from "../FormField/BioField";
import {
  type TermsAgreementField,
  $TermsAgreementField,
} from "../FormField/TermsAgreementField";

export interface RegistrationForm {
  readonly name: NameField;
  readonly email: EmailField;
  readonly password: PasswordField;
  readonly age: AgeField;
  readonly gender: GenderField;
  readonly country: CountryField;
  readonly bio: BioField;
  readonly agreeTerms: TermsAgreementField;
}

const fieldOperations = {
  name: $NameField,
  email: $EmailField,
  password: $PasswordField,
  age: $AgeField,
  gender: $GenderField,
  country: $CountryField,
  bio: $BioField,
  agreeTerms: $TermsAgreementField,
} as const;

export type RegistrationFormOperations = typeof fieldOperations;

export type RegistrationFormData =
  ExtractFormDataType<RegistrationFormOperations>;

export const $RegistrationForm = {
  schema: () => {
    const schemaEntries = Object.entries(fieldOperations).map(
      ([key, field]) => [key, field.schema()],
    );
    return z.object(Object.fromEntries(schemaEntries));
  },
  create: (
    data: RegistrationFormData,
  ): Result<RegistrationForm, ValidationError[]> => {
    const results = {
      name: fieldOperations.name.create(data.name),
      email: fieldOperations.email.create(data.email),
      password: fieldOperations.password.create(data.password),
      age: fieldOperations.age.create(data.age),
      gender: fieldOperations.gender.create(data.gender),
      country: fieldOperations.country.create(data.country),
      bio: fieldOperations.bio.create(data.bio),
      agreeTerms: fieldOperations.agreeTerms.create(data.agreeTerms),
    };

    const errors: ValidationError[] = [];

    Object.values(results).forEach((result) => {
      if (result._tag === "failure") {
        errors.push(...result.error);
      }
    });

    if (errors.length > 0) {
      return failure(errors);
    }

    return success({
      name:
        results.name._tag === "success"
          ? results.name.value
          : ({} as NameField),
      email:
        results.email._tag === "success"
          ? results.email.value
          : ({} as EmailField),
      password:
        results.password._tag === "success"
          ? results.password.value
          : ({} as PasswordField),
      age:
        results.age._tag === "success" ? results.age.value : ({} as AgeField),
      gender:
        results.gender._tag === "success"
          ? results.gender.value
          : ({} as GenderField),
      country:
        results.country._tag === "success"
          ? results.country.value
          : ({} as CountryField),
      bio:
        results.bio._tag === "success" ? results.bio.value : ({} as BioField),
      agreeTerms:
        results.agreeTerms._tag === "success"
          ? results.agreeTerms.value
          : ({} as TermsAgreementField),
    });
  },
  toDTO: (form: RegistrationForm) => ({
    name: fieldOperations.name.getValue(form.name),
    email: fieldOperations.email.getValue(form.email),
    password: fieldOperations.password.getValue(form.password),
    age: fieldOperations.age.getValue(form.age),
    gender: fieldOperations.gender.getValue(form.gender),
    country: fieldOperations.country.getValue(form.country),
    bio: fieldOperations.bio.getValue(form.bio),
    agreeTerms: fieldOperations.agreeTerms.getValue(form.agreeTerms),
  }),
};
