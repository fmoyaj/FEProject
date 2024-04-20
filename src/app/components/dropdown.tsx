interface Option<T> {
    id: string;
    label: string;
    value: T;
}

interface Props<T> {
    label: string;
    options: Option<T>[];
    onSelect: (value: T) => void;
}

export function Dropdown<T>({label, options} : Props<T>) {
    <div>
        <label><span>{label}</span></label>
        <input type="checkbox" id="touch">
            <ul className="slide">
                {
                    options.map(({id, label, value}) =>
                    <li key={id}>{label}</li>)
                }
            </ul>
        </input>
    </div>
}