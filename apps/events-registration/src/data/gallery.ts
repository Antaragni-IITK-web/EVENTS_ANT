/* Event gallery photos, pulled from the shared Drive folder
   https://drive.google.com/drive/folders/1o61w-HkX8lFSEnE41WDKwh0beRoUk1DU
   One subfolder per event; these are the Drive file ids of the first 12
   images in each. Served straight off Drive's CDN for now - see the note in
   Gallery.tsx about moving them into /public before launch. */

export const eventGallery: Record<string, string[]> = {
	/* Anime Convention - 5 of 5 photos */
	anicon: [
		"1RsT3lhlfPiqVmuwuJAR3zDKag4YRsarr",
		"133l8bc7ApRPILO02z2u-MCjZ5sMtX-o8",
		"1jOEyCaYBPixjTEkJYt9pTiRPoxNeGeiA",
		"1eFU7HNVCp2LUIev8X6OH4NAJTxWob_ge",
		"1pkaFATjCsC2sF3DKGB2O7o2QiEQT2HtI",
	],
	/* Dance - 12 of 28 photos */
	dance: [
		"1w_DCaQGGhyFnSCPm2olq_YcFjIxJfd40",
		"1x1hFPlIMA-J5DrWwktslDAOIIL0HNDIm",
		"15-liF1NaxBEc25wwfz5C1a4-PtT5Z_TD",
		"130VM-BlRp_4t0YNb4ugq1AL3zWNAArRZ",
		"1CfqcLWUDecYZHYKNKFhVM3Zn-1lpuYoh",
		"1LrBC--zj_yD5EbvqkIsrXuYbyTZ0i4iD",
		"1XzOqtFxTqFeLp5g2ROYMtizsKFIryX16",
		"1bhjsQTfhCvF9nJpMkWet4rqRrrrWBH0w",
		"1MY1Y5yY0n4c4K2UXX625w-grPla9QAfh",
		"1ImUwNMZYENrfMHL89OKkB77pT_tPCkEf",
		"1q23s5cf3VKax98ockF3LGSzeS8ilnRz_",
		"1C6GYA_QrUXepoYhT752pjvHxkniZ6DdC",
	],
	/* Debate - 5 of 5 photos */
	debate: [
		"1EcjzBnyz13F1L0WoJgKB7jzWyxMOtEkG",
		"189_GAXalZCg8c6OnQF7wbwY8nyXpKBvx",
		"1ML9GkJWaPjrgvTjBh3o2H58o3JNFmqP5",
		"1GT6RzFjOOIYixMMA9rv6El7_enIyPqeY",
		"14L8zKKTWhEqDs3DQvkZqxf96nXEz0JHM",
	],
	/* Dramatics - 12 of 32 photos */
	dramatics: [
		"148OP7g9WzCtrw6I_1Ub30Aq2V7k7IvKV",
		"1wz9pAmS66fOgfJlZnFGJl2XwVV1NKk9m",
		"1NS3LexuAs5Baxz95ZdQNC8UZe1YFPTaH",
		"16tskGjohHY_i1ooiNFnU4xjkXEZAymBy",
		"1Lh6VTB7SadQQ_ReJhGHoXV5AOjKb1aj1",
		"1h6dNqRx1CaA1elbrU6VNShdA4pV0uqZP",
		"1RIDJ-KrIv1WLrFxcI1SnkU-MGJG8AVYj",
		"1zGNF1-QDxRN3uYrvenjr-fq03lTGbs-r",
		"1FwMHOwk87MGg5ZI0RUXm_iLfyvUqIirs",
		"1HaSY4NFAHaJhMk18a3qsNZaj5UABbjeO",
		"1qAaoOog6YmNEugngSS3_s_V5_XGgPXBo",
		"1PEBoxGafqzAxtZm94Mx7Lc4dfkQ_HnkF",
	],
	/* English Literary - 8 of 8 photos */
	ele: [
		"1pBibbAaUSlsxa7AQOLYcRNRoFsOEq-w5",
		"1oqQ2ZC3hNDmqzKvhJD00z7o8C98qydTA",
		"1nVTFnt8NK7c08SY64xwepXlp-ewK20T2",
		"1Zn9Jt0KHGMB-6Phz37o7wYhHGm06Qf_s",
		"1muNlJlM3VU0wKU9wE-HAC9yn-5V9q7g0",
		"1KchmYWYQwizIFWSgaGoFri-0zWbx8-q7",
		"1oaSMznnI0VKlsgP50vOTqTdVHBcgWxfa",
		"1s_F5WjNEMGyOQ9UkNvUM2zMwW-eDcC06",
	],
	/* Films and Photography - 12 of 15 photos */
	fnp: [
		"1L9yQQIYZr4LRmx1ZZEoypGC3qNBaf-vC",
		"1q5I41KjHgmmKF2LpvU0K7AqoFM-urES-",
		"1nlHpSPFGILBY0ZBpCVDb-mx6oE-NOGa7",
		"1ui1L5r8Tr0sldhsHM5gZ_6RN3FRNMzOR",
		"1tkCs5gxOZggcwQYXH9oeKPxHWgko7C2F",
		"1NHyV_3_FdCCP9O6mY6pzwKOYjTdzgDRA",
		"1dkMEpzxmRgqUNAZQKWTFjR6kN_IOmgW7",
		"1FQUpk31LPEwb1oBTs_e7u7o1tYLUS2BX",
		"10k67KT0wZvbBJ7Hwzv_zRftcXX8Vk3Kw",
		"1Jnm9O-66-1UePfprIdFXOPFSd2EFLJaW",
		"1jBGDInf-NaLoo4xOlT8j98M0SFA0lh-6",
		"1y5JzQSKL_WxXe-5CzAGFMI07aGNAuGFY",
	],
	/* Fine Arts - 1 of 1 photos */
	finearts: [
		"11JfyGCyRcANuBjAZmm4bCKYsMNQTRIrZ",
	],
	/* Hindi Literary - 12 of 25 photos */
	hle: [
		"10ZKFXKsnwi5foamd-UwH_vVEA7xHtHZ_",
		"1b4TxbPBd2ePqnqtB68lUbDuhTN5IyllP",
		"1MP9G-zWpOlyDkaKeMetxmOvTGNIPwUc6",
		"1tsoRCCvm1i9FvGghlyySav8gANxhCgYg",
		"1FkkBfWwumePlpFt3r25uktMioQQVpiIq",
		"1hItuSIwjVYzhBJ5kSedJHfhGUJtXlHmZ",
		"1f8zIUEKF_Hy94336YhjPrUFnHeh81D4a",
		"13HznScJZxJUZZbVM3TmeXV-LhsOrR4pj",
		"1LgoId0y8mzCBR_swEyesGPokPWlF2C9G",
		"124pFrtHFqzEppHg1jdxslf7t4ZqIl1-3",
		"1EAna31SKsbSSP8wTiSTWcdihiqQ2S-5I",
		"1q5a5-rle5Q8XKiqYk4y9fy0DDjh8vyVb",
	],
	/* Mr and Mrs antaragni - 12 of 64 photos */
	MnM: [
		"1UVkNxPO7Gf-dh39nYsmFRRRfobOdJuDI",
		"173DdPFgYcf8PYU7Rx3Gn6FTGT-bfX3nk",
		"1UctbuALbDtBEyAPmkQWsBGhbzR1Vb4cf",
		"1YdERBbkYh9RDYqxIVckyxM72Dgpx2Nc7",
		"1ud44RfDGq06CIEAQ1wanYBwXMf11pXZI",
		"1bWE_AMnb9IulIt9DxZgJVKav-U7V9Tjl",
		"1Ur1x8Z6_8GVepnWaPGOxhCSl2MWhXzWn",
		"1PnxZldhlTI5VpJGFK8DWCXVouxKKnr55",
		"1PN1fx68FXrgqQjsJYeBaLuNmofbqRr6O",
		"1ba2JVYiB9g4wMprIfE0nsfoaReHfvn1X",
		"1GkOumYpv5e6mK-6cnEdWS8fUoZMwSOP2",
		"1UUcl948WbXcyi-oeiu2huHq2KqFStTc7",
	],
	/* Music - 12 of 140 photos */
	musicals: [
		"1segkz5SNs16OBpXK_N9LumJsFizNesOw",
		"1zLi-UHL-AtRmaEIcMuze5XDHuGczIElr",
		"1_P0kxqgfxy3ykflIvcZbQot0ta9QE6Ef",
		"1srBFzUQpFUmH5ZgwEcysRJ0wk0xXGwYP",
		"123HPJm9K-yb-5rqbhPwq12pI92ce8OQ9",
		"1wGntwm8l871sR8akwQv4i2-EZAwY3Gg8",
		"18WevNlqy5yNa7Ne2ZEkIJFAUwqKfeWaL",
		"1hXPhYye1e-r3mTqiC2a5NZUoChEoNkN3",
		"14c6nZrp9kgKus6IH-XvFuenD6JuJge3A",
		"1KVjg-Oeb5pby6yoPJib3DyXvl794_Ztc",
		"1pMLGqo8SiBdn_6CQ29aNkTlGHjiFyCcK",
		"1BEeO0hlY09TnAt7j-B3UHUMnpEHglTDH",
	],
	/* Quiz - 7 of 7 photos */
	quiz: [
		"1RtIoR8n_vUbtvWdtrnYtheda8UByco2L",
		"1Vn3Z-IITjH3SBNyHKGMCGZsH4abnwV3Q",
		"1A2rh_ejrgBnpjseM4dtyh8x3015DeFP2",
		"1PS7Kjg3K_vI52rgN5JUv8e_uMW7xoQSJ",
		"1MSI46OxD058ce_3RLmGvdVp2z8Hzo5iq",
		"1hX5DMrX2aTA8vv1Hfy6HnH-ISG3jTUsz",
		"1_9-1ahWr4u_Pta6myjw0VhyvJk4PrT_1",
	],
	/* Ritambhara - 12 of 46 photos */
	ritambhara: [
		"1_anazMq_fyBvuVi6n3JNZdJRYx2Kgrn5",
		"1JOar9-Xgur1j81wcDoPxlqsKzshwWuzW",
		"1g8LLJVUljoO6zQ3uKZJ374s4XPk_-zdF",
		"1o7ag2CNZSt1NriXGbdESJluVsB7dRH_2",
		"1YIA4I3ZeArsZvst5PMh5UKlYpnzcipJT",
		"1oIoD7htAOMVCnKbeodl1sp4yCTyta-Mh",
		"1Gb8wkpUzy2PvNKiJFgoNULW1tiRDg3Gt",
		"1GGk7skfyfhwVBmOkZxNkRhbKTmFX223r",
		"1-0tLv9XciDPZtjSv3GVlShvePFwDyrzR",
		"1_d4YKNtpyQ-Ng6hrEDtPH4xdghBdceDf",
		"14pAFcyDA4-_gGaLilqDxJQg_6_V6-Gid",
		"1s5FbvVnvju00wXWigIejO7qxuDTlYb5p",
	],
};

/* Drive serves a resized JPEG off its CDN for any public file id.

   Use the lh3 host, not drive.google.com/thumbnail: that endpoint 403s any
   request carrying a Referer header, so it works in curl but fails in a real
   browser. lh3 serves the same bytes with or without a referrer. */
export function driveImage(id: string, width: number) {
	if (id.startsWith("http")) return id;
	return `https://lh3.googleusercontent.com/d/${id}=w${width}`;
}
