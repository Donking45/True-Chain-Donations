import { ByteString, SmartContract, assert, method, prop } from 'scrypt-ts'

export type Donation = {
    donationMade: boolean
}

export class TrueCharityDonations extends SmartContract {
    @prop()
    amount: bigint

    @prop()
    purpose: ByteString

    @prop()
    isAnonymous: boolean

    @prop()
    donations: Map<ByteString, Donation>

    constructor(amount: bigint, purpose: ByteString, isAnonymous: boolean) {
        super(...arguments)
        this.amount = amount
        this.purpose = purpose
        this.isAnonymous = isAnonymous
        this.donations = new Map()
    }

    @method()
    public addDonation(charity: ByteString) {
        this.donations.set(charity, { donationMade: false })
    }

    @method()
    public completeDonation(charity: ByteString) {
        const donation = this.donations.get(charity)
        assert(donation !== undefined, 'Donation not found')
        donation.donationMade = true
        this.donations.set(charity, donation)
    }

    @method()
    public getDonationStatus(charity: ByteString): boolean {
        const donation = this.donations.get(charity)
        if (donation === undefined) {
            return false
        }
        return donation.donationMade
    }
}
