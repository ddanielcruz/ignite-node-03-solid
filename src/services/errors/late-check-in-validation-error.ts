export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'Check-in validation is only allowed within 20 minutes of its creation.',
    )
  }
}
