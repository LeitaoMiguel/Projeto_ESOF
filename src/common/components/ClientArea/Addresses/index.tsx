import React from 'react';

import AddAddressTab from './CreateAddressTab';
import AddressesTab from './AddressesTab';

const AddressesPage = () => {
    return (
        <div className="space-y-6">
            <AddressesTab/>
            <AddAddressTab/>
        </div>
    )
}

export default AddressesPage;