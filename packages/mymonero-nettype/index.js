
'use strict'

const network_type = {
  MAINNET: 0,
  TESTNET: 1,
  STAGENET: 2,
  FAKECHAIN: 3,
  UNDEFINED: 4
}

exports.network_type = network_type;

exports.nettype_to_API_string = function (nettype) {
  switch (nettype) {
    case network_type.MAINNET:
      return 'MAINNET'
    case network_type.TESTNET:
      return 'TESTNET'
    case network_type.STAGENET:
      return 'STAGENET'
    case network_type.FAKECHAIN:
      return 'FAKECHAIN'
    case network_type.UNDEFINED:
      return 'UNDEFINED'
  }
  throw new Error('Unrecognized nettype');
}

var __MAINNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = 0xd7
var __MAINNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = 0x7b54
var __MAINNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = 0x77d4

var __TESTNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = 53
var __TESTNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = 54
var __TESTNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = 63

var __STAGENET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = 24
var __STAGENET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = 25
var __STAGENET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = 36

function cryptonoteBase58PrefixForStandardAddressOn (nettype) {
  if (nettype == null || typeof nettype === 'undefined') {
    console.warn('Unexpected nil nettype')
  }
  if (nettype === network_type.MAINNET) {
    return __MAINNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
  } else if (nettype == network_type.TESTNET) {
    return __TESTNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
  } else if (nettype == network_type.STAGENET) {
    return __STAGENET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
  }
  throw new Error('Illegal nettype');
}

function cryptonoteBase58PrefixForIntegratedAddressOn (nettype) {
  if (nettype === null || typeof nettype === 'undefined') {
    console.warn('Unexpected nil nettype')
  }
  if (nettype == network_type.MAINNET) {
    return __MAINNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
  } else if (nettype == network_type.TESTNET) {
    return __TESTNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
  } else if (nettype == network_type.STAGENET) {
    return __STAGENET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
  }
  throw new Error('Illegal nettype');
}

function cryptonoteBase58PrefixForSubAddressOn (nettype) {
  if (nettype === null || typeof nettype === 'undefined') {
    console.warn('Unexpected nil nettype')
  }
  if (nettype == network_type.MAINNET) {
    return __MAINNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
  } else if (nettype == network_type.TESTNET) {
    return __TESTNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
  } else if (nettype == network_type.STAGENET) {
    return __STAGENET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
  }
  throw new Error('Illegal nettype');
}

exports.cryptonoteBase58PrefixForStandardAddressOn = cryptonoteBase58PrefixForStandardAddressOn
exports.cryptonoteBase58PrefixForIntegratedAddressOn = cryptonoteBase58PrefixForIntegratedAddressOn
exports.cryptonoteBase58PrefixForSubAddressOn = cryptonoteBase58PrefixForSubAddressOn
