# DISCLAIMER

The modules in this folder use non standarized cryptography. (Cryptography made and testested only by me). Use at your own risk.

### CSPRNG_module.js
Javascript Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)

##### dieharder results:
| Test Name                | ntup | tsamples  | psamples | p-value     | Assessment |
|--------------------------|------|-----------|----------|-------------|------------|
| diehard_birthdays        | 0    | 100       | 100      | 0.95474805  | PASSED     |
| diehard_operm5           | 0    | 1000000   | 100      | 0.06209149  | PASSED     |
| diehard_rank_32x32       | 0    | 40000     | 100      | 0.09570002  | PASSED     |
| diehard_rank_6x8         | 0    | 100000    | 100      | 0.33319832  | PASSED     |
| diehard_bitstream        | 0    | 2097152   | 100      | 0.27399417  | PASSED     |
| diehard_opso             | 0    | 2097152   | 100      | 0.48054826  | PASSED     |
| diehard_oqso             | 0    | 2097152   | 100      | 0.10063325  | PASSED     |
| diehard_dna              | 0    | 2097152   | 100      | 0.91000396  | PASSED     |
| diehard_count_1s_str     | 0    | 256000    | 100      | 0.19013079  | PASSED     |
| diehard_count_1s_byt     | 0    | 256000    | 100      | 0.00818982  | PASSED     |
| diehard_parking_lot      | 0    | 12000     | 100      | 0.99259700  | PASSED     |
| diehard_2dsphere         | 2    | 8000      | 100      | 0.97445749  | PASSED     |
| diehard_3dsphere         | 3    | 4000      | 100      | 0.38455264  | PASSED     |
| diehard_squeeze          | 0    | 100000    | 100      | 0.60760764  | PASSED     |
| diehard_sums             | 0    | 100       | 100      | 0.00026848  | WEAK       |
| diehard_runs             | 0    | 100000    | 100      | 0.90355960  | PASSED     |
| diehard_runs             | 0    | 100000    | 100      | 0.99412666  | PASSED     |
| diehard_craps            | 0    | 200000    | 100      | 0.08182440  | PASSED     |
| diehard_craps            | 0    | 200000    | 100      | 0.92371449  | PASSED     |
| marsaglia_tsang_gcd      | 0    | 10000000  | 100      | 0.82836584  | PASSED     |
| marsaglia_tsang_gcd      | 0    | 10000000  | 100      | 0.57707729  | PASSED     |
| sts_monobit              | 1    | 100000    | 100      | 0.02172882  | PASSED     |
| sts_runs                 | 2    | 100000    | 100      | 0.04167728  | PASSED     |
| sts_serial               | 1    | 100000    | 100      | 0.89978841  | PASSED     |
| sts_serial               | 2    | 100000    | 100      | 0.87871068  | PASSED     |
| sts_serial               | 3    | 100000    | 100      | 0.73770325  | PASSED     |
| sts_serial               | 3    | 100000    | 100      | 0.67400297  | PASSED     |
| sts_serial               | 4    | 100000    | 100      | 0.50323482  | PASSED     |
| sts_serial               | 4    | 100000    | 100      | 0.28553758  | PASSED     |
| sts_serial               | 5    | 100000    | 100      | 0.80373988  | PASSED     |
| sts_serial               | 5    | 100000    | 100      | 0.93812302  | PASSED     |
| sts_serial               | 6    | 100000    | 100      | 0.83008376  | PASSED     |
| sts_serial               | 6    | 100000    | 100      | 0.21257648  | PASSED     |
| sts_serial               | 7    | 100000    | 100      | 0.79374445  | PASSED     |
| sts_serial               | 7    | 100000    | 100      | 0.99973994  | WEAK       |
| sts_serial               | 8    | 100000    | 100      | 0.80708946  | PASSED     |
| sts_serial               | 8    | 100000    | 100      | 0.35690213  | PASSED     |
| sts_serial               | 9    | 100000    | 100      | 0.87087244  | PASSED     |
| sts_serial               | 9    | 100000    | 100      | 0.98644202  | PASSED     |
| sts_serial               | 10   | 100000    | 100      | 0.74950552  | PASSED     |
| sts_serial               | 10   | 100000    | 100      | 0.74616215  | PASSED     |
| sts_serial               | 11   | 100000    | 100      | 0.40690868  | PASSED     |
| sts_serial               | 11   | 100000    | 100      | 0.66839290  | PASSED     |
| sts_serial               | 12   | 100000    | 100      | 0.13825363  | PASSED     |
| sts_serial               | 12   | 100000    | 100      | 0.68109164  | PASSED     |
| sts_serial               | 13   | 100000    | 100      | 0.45082860  | PASSED     |
| sts_serial               | 13   | 100000    | 100      | 0.13018710  | PASSED     |
| sts_serial               | 14   | 100000    | 100      | 0.63974981  | PASSED     |
| sts_serial               | 14   | 100000    | 100      | 0.96120617  | PASSED     |
| sts_serial               | 15   | 100000    | 100      | 0.89000074  | PASSED     |
| sts_serial               | 15   | 100000    | 100      | 0.62367496  | PASSED     |
| sts_serial               | 16   | 100000    | 100      | 0.38033499  | PASSED     |
| sts_serial               | 16   | 100000    | 100      | 0.08584125  | PASSED     |
| rgb_bitdist              | 1    | 100000    | 100      | 0.32746440  | PASSED     |
| rgb_bitdist              | 2    | 100000    | 100      | 0.55164427  | PASSED     |
| rgb_bitdist              | 3    | 100000    | 100      | 0.54854024  | PASSED     |
| rgb_bitdist              | 4    | 100000    | 100      | 0.04083091  | PASSED     |
| rgb_bitdist              | 5    | 100000    | 100      | 0.84574543  | PASSED     |
| rgb_bitdist              | 6    | 100000    | 100      | 0.31584673  | PASSED     |
| rgb_bitdist              | 7    | 100000    | 100      | 0.87754128  | PASSED     |
| rgb_bitdist              | 8    | 100000    | 100      | 0.93930977  | PASSED     |
| rgb_bitdist              | 9    | 100000    | 100      | 0.15631852  | PASSED     |
| rgb_bitdist              | 10   | 100000    | 100      | 0.74836971  | PASSED     |
| rgb_bitdist              | 11   | 100000    | 100      | 0.93907961  | PASSED     |
| rgb_bitdist              | 12   | 100000    | 100      | 0.83484088  | PASSED     |
| rgb_minimum_distance     | 2    | 10000     | 100      | 0.31714059  | PASSED     |
| rgb_minimum_distance     | 3    | 10000     | 100      | 0.20922939  | PASSED     |
| rgb_minimum_distance     | 4    | 10000     | 100      | 0.29387905  | PASSED     |
| rgb_minimum_distance     | 5    | 10000     | 100      | 0.08900428  | PASSED     |
| rgb_permutations         | 2    | 100000    | 100      | 0.02900132  | PASSED     |
| rgb_permutations         | 3    | 100000    | 100      | 0.00317155  | WEAK       |
| rgb_permutations         | 4    | 100000    | 100      | 0.05810496  | PASSED     |
| rgb_permutations         | 5    | 100000    | 100      | 0.54805861  | PASSED     |
| rgb_lagged_sum           | 0    | 1000000   | 100      | 0.80171761  | PASSED     |
| rgb_lagged_sum           | 1    | 1000000   | 100      | 0.76829575  | PASSED     |
| rgb_lagged_sum           | 2    | 1000000   | 100      | 0.78042873  | PASSED     |
| rgb_lagged_sum           | 3    | 1000000   | 100      | 0.91031528  | PASSED     |
| rgb_lagged_sum           | 4    | 1000000   | 100      | 0.95376391  | PASSED     |
| rgb_lagged_sum           | 5    | 1000000   | 100      | 0.98221128  | PASSED     |
| rgb_lagged_sum           | 6    | 1000000   | 100      | 0.98746074  | PASSED     |
| rgb_lagged_sum           | 7    | 1000000   | 100      | 0.91835171  | PASSED     |
| rgb_lagged_sum           | 8    | 1000000   | 100      | 0.91531762  | PASSED     |
| rgb_lagged_sum           | 9    | 1000000   | 100      | 0.52640235  | PASSED     |
| rgb_lagged_sum           | 10   | 1000000   | 100      | 0.76157956  | PASSED     |
| rgb_lagged_sum           | 11   | 1000000   | 100      | 0.37415343  | PASSED     |
| rgb_lagged_sum           | 12   | 1000000   | 100      | 0.94788257  | PASSED     |
| rgb_lagged_sum           | 13   | 1000000   | 100      | 0.50634090  | PASSED     |
| rgb_lagged_sum           | 14   | 1000000   | 100      | 0.38084375  | PASSED     |
| rgb_lagged_sum           | 15   | 1000000   | 100      | 0.68828408  | PASSED     |
| rgb_lagged_sum           | 16   | 1000000   | 100      | 0.96363984  | PASSED     |
| rgb_kstest_test          | 0    | 10000     | 100      | 0.30912207  | PASSED     |
| dab_bytedistrib          | 0    | 512000    | 1        | 0.441574    | PASSED     |
| dab_dct                  | 1    | 500000    | 1        | 0.366090    | PASSED     |
| dab_filltree2            | 0    | 50000000  | 1        | 0.195051    | PASSED     |
| dab_filltree2            | 1    | 50000000  | 1        | 0.582257    | PASSED     |
| dab_filltree             | 0    | 15000000  | 1        | 0.898963    | PASSED     |
| dab_filltree             | 1    | 15000000  | 1        | 0.633606    | PASSED     |
| dab_monobit2             | 0    | 512000    | 1        | 0.746899    | PASSED     |
| dab_monobit2             | 12   | 65000000  | 1        | 0.87341897  | PASSED     |
| dab_birthdays1           | 32   | 2000      | 1        | 0.37523313  | PASSED     |
| dab_opso2                |  0   | 67108864  | 1        | 0.84273832  | PASSED     |
| dab_opso2                |  1   | 67108864  | 1        | 0.50935704  | PASSED     |

##### ent results:
| File          | Size (bytes) | Entropy (bits/byte) | Optimal Reduction (%) | Chi-square   | Arithmetic Mean | MC Pi | Serial Correlation | Score |
|---------------|--------------|---------------------|-----------------------|--------------|-----------------|-------|--------------------|-------|
| urandom       | 10000        | 3.321443            | 58                    | 246172.65    | 52.5169         | 4     | 0.004015           | 75    |
| CSPRNG        | 10000        | 3.320718            | 58                    | 246431.92    | 52.4510         | 4     | 0.007380           | 75    |


### CSPRNG.html
Web Version of the module (it's exactly the same, but with an interface)
