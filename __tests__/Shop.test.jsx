
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent} from "@testing-library/react";
import { Shop } from "../src/Shop/Shop";
import { MemoryRouter } from "react-router";
import { getCats } from "../src/Shop/getCats";
import userEvent from "@testing-library/user-event"


const dummyData = [{ name: 'Milo', breed: 'Tabby', description: 'Loves naps in sunny spots', colour: 'Orange', cost: 50, image_url: 'http://localhost:3001/images/milo_cropped.jpg' },
  { name: 'Luna', breed: 'Siamese', description: 'Very vocal, always has something to say', colour: 'Grey', cost: 75, image_url: 'http://localhost:3001/images/luna.jpg' },
  { name: 'Oliver', breed: 'British Shorthair', description: 'Calm and affectionate lap cat', colour: 'Grey', cost: 90, image_url: 'http://localhost:3001/images/oliver.jpg'},]


vi.mock('../src/Shop/getCats.js', () => ({
    getCats: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCats).mockResolvedValue(dummyData);
})

describe("test breed and colour" , () => {
    it("test that checks cat cards are rendered", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>);
        
        // findBy waits for the getCats promise to resolve and the cards to render
        expect(await screen.findByText('Milo!')).toBeInTheDocument();
        expect(screen.getByText('Luna!')).toBeInTheDocument();
        expect(screen.getByText('Oliver!')).toBeInTheDocument();
    })

    it("test that breed correctly filters cards (1)", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>);

        // wait for the fetch to land before interacting, so the breed
        // checkboxes (derived from cats) actually exist
        await screen.findByText('Luna!');

        // open the breed dropdown, then tick Siamese
        fireEvent.click(screen.getByRole('button', { name: 'breed' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Siamese' }));

        // fireEvent flushes React's work, so the filtered DOM is already settled
        expect(screen.getByText('Luna!')).toBeInTheDocument();
        expect(screen.queryByText('Milo!')).not.toBeInTheDocument();
        expect(screen.queryByText('Oliver!')).not.toBeInTheDocument();
    })

    it("test that breed filter, then unfilter, returns cards to original state", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>);


        await screen.findByText('Luna!');

        fireEvent.click(screen.getByRole('button', { name: 'breed' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Siamese' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Siamese' }));

        expect(screen.getByText('Luna!')).toBeInTheDocument();
        expect(screen.queryByText('Milo!')).toBeInTheDocument();
        expect(screen.queryByText('Oliver!')).toBeInTheDocument();
    })

    it("test that colour filter returns cards to original state", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>);


        await screen.findByText('Luna!');


        fireEvent.click(screen.getByRole('button', { name: 'colour' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Grey' }));

        expect(screen.getByText('Luna!')).toBeInTheDocument();
        expect(screen.getByText('Oliver!')).toBeInTheDocument();
        expect(screen.queryByText('Milo!')).not.toBeInTheDocument();
    })

    it("test that colour filter, then unfilter, returns cards to original state", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>);

        await screen.findByText('Luna!');


        fireEvent.click(screen.getByRole('button', { name: 'colour' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Grey' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Grey' }));


        expect(screen.getByText('Luna!')).toBeInTheDocument();
        expect(screen.queryByText('Milo!')).toBeInTheDocument();
        expect(screen.queryByText('Oliver!')).toBeInTheDocument();
    })

    it("test that colour and breed filters work as intended when put together", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>);

        await screen.findByText('Luna!');

        fireEvent.click(screen.getByRole('button', { name: 'colour' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'Orange' }));
        fireEvent.click(screen.getByRole('button', { name: 'breed' }));
        fireEvent.click(screen.getByRole('checkbox', { name: 'British Shorthair' }));
        
        expect(screen.queryByText('Oliver!')).not.toBeInTheDocument();
        expect(screen.queryByText('Milo!')).not.toBeInTheDocument();
        expect(screen.queryByText('Luna!')).not.toBeInTheDocument();
    })
})

describe("test price and age", () => {
    test("test that price lower bound correctly filters", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>)

        await findByText('Luna')
        
        await userEvent.click(screen.getByRole('button', { name: "price"}))
        await userEvent.click(screen.getByRole('input', {name: "price-from"}))
        await userEvent.keyboard('70')

        expect(screen.queryByText('Luna!')).toBeInTheDocument();
        expect(screen.queryByText('Oliver!')).toBeInTheDocument();
        expect(screen.queryByText('Milo!')).not.toBeInTheDocument();
    })

    test("test that price upper bound correctly filters", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>)

        await findByText('Luna')
        
        await userEvent.click(screen.getByRole('button', { name: "price"}))
        await userEvent.click(screen.getByRole('input', {name: "price-to"}))
        await userEvent.keyboard('80')

        expect(screen.queryByText('Luna!')).toBeInTheDocument();
        expect(screen.queryByText('Milo!')).toBeInTheDocument();
        expect(screen.queryByText('Oliver!')).not.toBeInTheDocument();
    })

    test("test that price upper bound and lowerbound correctly filters", async () => {
        render(<MemoryRouter><Shop/></MemoryRouter>)

        await findByText('Luna')
        
        await userEvent.click(screen.getByRole('button', { name: "price"}))
        await userEvent.click(screen.getByRole('input', {name: "price-to"}))
        await userEvent.keyboard('80')
        await userEvent.click(screen.getByRole('input', {name: "price-from"}))
        await userEvent.keyboard('55')

        expect(screen.queryByText('Luna!')).not.toBeInTheDocument();
        expect(screen.queryByText('Milo!')).toBeInTheDocument();
        expect(screen.queryByText('Oliver!')).not.toBeInTheDocument();
    })
})

